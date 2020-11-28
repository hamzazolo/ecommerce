package com.backend.ecommerce.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.aspectj.bridge.MessageUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.backend.ecommerce.exceptions.FileConversionException;
import com.backend.ecommerce.exceptions.InvalidImageExtensionException;
import com.backend.ecommerce.models.AmazonImage;
import com.backend.ecommerce.utils.FileUtils;
import org.apache.commons.io.FilenameUtils;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service

public class AmazonS3ImageService {

	// AmazonS3 Client, in this object you have all AWS API calls about S3.
	private AmazonS3 amazonS3;
	// Your bucket URL, this URL is https://{bucket-name}.s3-{region}.amazonaws.com/
	// If you don't know if your URL is ok, send one file to your bucket using AWS
	// and
	// click on them, the file URL contains your bucket URL.
	@Value("${amazon.s3.endpoint}")
	private String url;
	// Your bucket name.
	@Value("${amazon.s3.bucket-name}")
	private String bucketName;
	// The IAM access key.
	@Value("${amazon.s3.access-key}")
	private String accessKey;
	// The IAM secret key.
	@Value("${amazon.s3.secret-key}")
	private String secretKey;

	// Getters for parents.
//		protected AmazonS3 getClient() {
//			return amazonS3;
//		}

	// This method are called after Spring starts AmazonClientService into your
	// container.
	@PostConstruct
	private void init() {
		
		// Init your AmazonS3 credentials using BasicAWSCredentials.
		BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);

		// Start the client using AmazonS3ClientBuilder, here we goes to make a standard
		// cliente, in the
		// region SA_EAST_2, and the basic credentials.
		this.amazonS3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_2)
				.withCredentials(new AWSStaticCredentialsProvider(credentials)).build();
		log.info("region name : "+this.amazonS3.getRegionName());
	}

	// Upload a List of Images to AWS S3.
	public List<AmazonImage> insertImages(List<MultipartFile> images) {
		List<AmazonImage> amazonImages = new ArrayList<>();
		System.out.println("i'm in insert image list");
		images.forEach(image -> amazonImages.add(this.uploadImageToAmazon(image)));
		return amazonImages;
	}

	// Upload image to AWS S3.
	public AmazonImage uploadImageToAmazon(MultipartFile multipartFile) {
		System.out.println("3 start uploadImageToAmazon ");
		// Valid extensions array, like jpeg/jpg and png.
		List<String> validExtensions = Arrays.asList("jpeg", "jpg", "png");

		// Get extension of MultipartFile
		String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
		if (!validExtensions.contains(extension)) {
			// If file have a invalid extension, call an Exception.
			// log.warn("invalid.image.extesion");
			throw new InvalidImageExtensionException(validExtensions);
		} else {
			// Upload file to Amazon.
			AmazonImage amazonImage = uploadMultipartFile(multipartFile);
			return amazonImage;
		}

	}

	public void removeImageFromAmazon(List<AmazonImage> ListAmazonImages) {
		for(AmazonImage amazonImage : ListAmazonImages) {
			String fileName = amazonImage.getImageUrl().substring(amazonImage.getImageUrl().lastIndexOf("/") + 1);
			this.amazonS3.deleteObject(new  DeleteObjectRequest(this.bucketName, fileName));
		}
		
	}

	// Make upload to Amazon.
	private AmazonImage uploadMultipartFile(MultipartFile multipartFile) {
		String fileUrl;
		AmazonImage amazonImage = new AmazonImage();
		System.out.println("4 uploadMultipartFile");
		try {
			// Get the file from MultipartFile.
			File file = FileUtils.convertMultipartToFile(multipartFile);

			// Extract the file name.
			String fileName = FileUtils.generateFileName(multipartFile);

			// Upload file.
			uploadPublicFile(fileName, file);
			System.out.println("6 go to delete ");
			// Delete the file and get the File Url.
			file.delete();
			System.out.println("7 after delete url ");
			fileUrl = this.url.concat(fileName);

			System.out.println("8 get url ");

			amazonImage.setImageUrl(fileUrl);
			amazonImage.setAmazonUserImageId(fileName);

		} catch (IOException e) {

			// If IOException on conversion or any file manipulation, call exception.
			e.printStackTrace();
			// log.warn("multipart.to.file.convert.except", e);
			throw new FileConversionException();
		}

		return amazonImage;
	}

	// Send image to AmazonS3, if have any problems here, the image fragments are
	// removed from amazon.
	// Font:
	// https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/s3/AmazonS3Client.html#putObject%28com.amazonaws.services.s3.model.PutObjectRequest%29
	private void uploadPublicFile(String fileName, File file) {
		System.out.println("5 uploadPublicFile");
		this.amazonS3.putObject(new PutObjectRequest(this.bucketName, fileName, file)
				.withCannedAcl(CannedAccessControlList.PublicRead));
	}

}
