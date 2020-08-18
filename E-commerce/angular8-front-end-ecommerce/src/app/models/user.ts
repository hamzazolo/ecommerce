import { Roles } from './roles';

export class User {

    id:number;
    username:string;
    nom:string;
    prenom:string;
    email:string;
    blocked:boolean;
    roles:Roles[];


    
    constructor(request : any){
        this.id = request.id;
        this.username = request.username;
        this.email = request.email;
        this.roles = request.roles;
        this.nom = request.nom;
        this.prenom = request.prenom;
    }
}
