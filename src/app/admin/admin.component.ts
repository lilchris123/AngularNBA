import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    @Input('currentUser') currentUser: User;
    users: User[] = [];
    displayedColumns: string[] = ['username', 'first_name', 'last_name', 'role','action'];
    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    loadAllNonAdminUsers(){
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users.filter(u=> (u.id != this.currentUser.id)); 
        });
    }


}
