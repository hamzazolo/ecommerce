package com.backend.ecommerce.controllers;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.ecommerce.exceptions.MaxUploadSizeExceededException;
import com.backend.ecommerce.exceptions.ResourceNotFoundException;
import com.backend.ecommerce.models.AmazonImage;
import com.backend.ecommerce.models.Category;
import com.backend.ecommerce.models.Product;
import com.backend.ecommerce.payload.response.MessageResponse;
import com.backend.ecommerce.payload.response.ProductResponse;
import com.backend.ecommerce.repository.ProductRepository;
import com.backend.ecommerce.services.AmazonS3ImageService;
import com.backend.ecommerce.services.CategoryService;
import com.backend.ecommerce.services.ProductService;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import springfox.documentation.spring.web.json.Json;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/product")
@Getter
public class ProductController {

	@Autowired
	private ProductRepository prodcutRep;
	@Autowired
	private ProductService productService;

	@GetMapping("/products")
	public ResponseEntity<?> products(@Param("id") Long id, @Param("page") int page, @Param("size") int size) {
		PageRequest pageRequest = PageRequest.of(page, size);
		Page<Product> p = this.prodcutRep.findByCategoryId(id, pageRequest);

		return ResponseEntity.ok(p);
	}

	@GetMapping("/allProducts")
	public ResponseEntity<?> allProduct(@Param("page") int page, @Param("size") int size) {
		PageRequest pageRequest = PageRequest.of(page, size);
		try {
			Page<Product> products = this.prodcutRep.findAll(pageRequest);
			return ResponseEntity.ok(products);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@GetMapping("/getProduct")
	public ResponseEntity<?> getProduct(@Param("id") Long id) {
		Product p = this.prodcutRep.findById(id).get();
		Product pro = new Product();

		pro = new Product(p.getName(), p.getDescription(), p.getDateCreated(), p.getPrice(), p.getUnitStock(),
				p.getImageURL(), p.getImageURL2(), p.getImageKey(), p.getSecendImageKey());

		pro.setCategory(p.getCategory());
		System.out.println("product return => " + pro.toString());
		return ResponseEntity.ok(pro);
	}

	@PostMapping(value = "/saveProduct")
	public ResponseEntity<MessageResponse> save(
			@RequestPart(value = "imageFile") @ApiParam("imageFile") MultipartFile file,
			@RequestPart(value = "secendImageFile") @ApiParam("secendImageFile") MultipartFile secendImage,
			@NotNull @RequestPart(value = "name") @ApiParam("name") String name,
			@RequestPart(value = "description") @ApiParam("description") String description,
			@RequestPart(value = "price") @ApiParam("price") String price,
			@RequestPart(value = "unitStock") @ApiParam("unitStock") String unitStock,
			@RequestPart(value = "id") @ApiParam("id") String id,
			@RequestPart(value = "nameCategory") @ApiParam("nameCategory") String nameCategory) throws IOException {

		try {
			List<AmazonImage> amazonImages = new ArrayList<>();
			List<MultipartFile> images = new ArrayList<MultipartFile>();
			String imageURL = null, imageURL2 = null, key1 = null, key2 = null;
			images.add(file);
			images.add(secendImage);
			System.out.println("image size : " + images.size());
			amazonImages = amazonS3ImageService.insertImages(images);
			if (!amazonImages.isEmpty()) {
				imageURL = amazonImages.get(0).getImageUrl();
				imageURL2 = amazonImages.get(1).getImageUrl();
				key1 = amazonImages.get(0).getAmazonUserImageId();
				key2 = amazonImages.get(1).getAmazonUserImageId();
			}
			BigDecimal bigDecimalPrice = new BigDecimal(price);
			int qte = Integer.parseInt(unitStock);
			Product p = new Product(name, description, new Date(), bigDecimalPrice, qte, imageURL, imageURL2, key1,
					key2);
			p.setCategory(new Category(Long.parseLong(id), nameCategory));
			this.prodcutRep.save(p);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Product added"));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new MessageResponse("Can not add product"));
		}

	}

	@PutMapping("/updateProduct")
	public ResponseEntity<?> update(@NotNull @RequestPart(value = "id") @ApiParam("id") String id,
			@RequestPart(value = "imageFile") @ApiParam("imageFile") MultipartFile file,
			@RequestPart(value = "imageFile2") @ApiParam("imageFile2") MultipartFile secendImage,
			@NotNull @RequestPart(value = "name") @ApiParam("name") String name,
			@RequestPart(value = "description") @ApiParam("description") String description,
			@RequestPart(value = "price") @ApiParam("price") String price,
			@RequestPart(value = "unitStock") @ApiParam("unitStock") String unitStock,
			@NotNull @RequestPart(value = "idCategory") @ApiParam("idCategory") String idCategory,
			@RequestPart(value = "nameCategory") @ApiParam("nameCategory") String nameCategory)
			throws ResourceNotFoundException {

		try {

			AmazonImage amazonImage = new AmazonImage();
			AmazonImage SecendAmazonImage = new AmazonImage();
			List<AmazonImage> listAmazonImages = new ArrayList<AmazonImage>();
			List<MultipartFile> images = new ArrayList<MultipartFile>();
			System.out.println("idProduct : " + id);
			System.out.println("idCategory : " + idCategory);
			System.out.println("category : " + nameCategory);
			Product p = this.prodcutRep.findById(Long.parseLong(id)).orElseThrow(
					() -> new ResourceNotFoundException("No product with this id :: " + Long.parseLong(id)));

			amazonImage = new AmazonImage(p.getImageKey(), p.getImageURL());
			SecendAmazonImage = new AmazonImage(p.getSecendImageKey(), p.getImageURL2());
			listAmazonImages.add(amazonImage);
			listAmazonImages.add(SecendAmazonImage);

			// delete image from amazon s3
			this.amazonS3ImageService.removeImageFromAmazon(listAmazonImages);
			// insert new images in amazon s3
			images.add(file);
			images.add(secendImage);
			List<AmazonImage> list = this.amazonS3ImageService.insertImages(images);

			int qte = Integer.parseInt(unitStock);
			BigDecimal bigDecimalPrice = new BigDecimal(price);
			p.setImageKey(list.get(0).getAmazonUserImageId());
			p.setSecendImageKey(list.get(1).getAmazonUserImageId());
			p.setImageURL(list.get(0).getImageUrl());
			p.setImageURL2(list.get(1).getImageUrl());
			p.setCategory(new Category(Long.parseLong(idCategory), nameCategory));
			p.setName(name);
			p.setDateUpdated(new Date());
			p.setPrice(bigDecimalPrice);
			p.setUnitStock(qte);
			p.setDescription(description);
			// update image
			return ResponseEntity.ok(this.prodcutRep.save(p));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new MessageResponse("Can not update product"));
		}
	}

	@DeleteMapping("/removeProduct/{id}")
	public ResponseEntity<?> remove(@PathVariable(value = "id") Long id) {
		AmazonImage amazonImage = new AmazonImage();
		AmazonImage SecendAmazonImage = new AmazonImage();
		List<AmazonImage> listAmazonImages = new ArrayList<AmazonImage>();

		try {
			Product p = this.prodcutRep.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("No product with this id :: " + id));

			amazonImage = new AmazonImage(p.getImageKey(), p.getImageURL());
			SecendAmazonImage = new AmazonImage(p.getSecendImageKey(), p.getImageURL2());
			listAmazonImages.add(amazonImage);
			listAmazonImages.add(SecendAmazonImage);
			this.amazonS3ImageService.removeImageFromAmazon(listAmazonImages);
			this.prodcutRep.deleteById(id);
			List<Product> products = this.prodcutRep.findAll();
			return ResponseEntity.ok(products);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("You can not delete this product", HttpStatus.BAD_REQUEST);
		}

	}

	@Autowired
	private AmazonS3ImageService amazonS3ImageService;

	@PostMapping("/images")
	public Object insertImages(@RequestPart(value = "images") List<MultipartFile> images) {
		System.out.println("post mapping insert images====");
		// log.info("i'm in image web service");
		try {
			System.out.println("try===");
			return ResponseEntity.ok(amazonS3ImageService.insertImages(images));
		} catch (Exception e) {
			System.out.println("caaaatch");
			return new MaxUploadSizeExceededException("soo large");
		}

	}
}
