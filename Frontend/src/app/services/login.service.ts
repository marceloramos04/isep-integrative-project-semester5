import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { User } from "../interfaces/user.interface";
import { backendUrl } from "../app.config";
import { Observable } from "rxjs";
import { AuthService } from '@auth0/auth0-angular';
import { hardCodedPatientId } from "../app.component";

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    url = backendUrl + '/User';

    constructor(private httpclient: HttpClient, private auth: AuthService) {

    }

    addUser(user: User): Observable<User> {
        return this.httpclient.post<User>(this.url, user);
    }


    checkUserRole(email: string): string | null {
        // Verificar o formato do email: name@role.sarm
        const emailRegex = /^[^@]+@(admin|doctor)\.sarm$/;
        const match = email.match(emailRegex);

        if (!this.validateEmailFormat(email)) {
            console.error("Formato de email inválido:", email);
            return null;
        } else {
            const match = email.match(emailRegex);

            if (!match) {
                return `patient-view/${hardCodedPatientId}/details-patient`;
                // return 'patient-view/202411000001/details-patient';
            } else {
                const role = match[1]; // Extrai o papel (role) do email

                switch (role) {
                    case "admin":
                        return "admin-view";
                        break;
                    case "doctor":
                        return "doctor-view";
                        break;

                    default:
                        console.error("Formato de email inválido:", email);
                        break;
                }

            }

        }return null;

    }


    validateEmailFormat(email: string): boolean {
        // Regex para validar o formato "algo@algo.algo"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    logout() {
        // alert('Calling logout from:' + window.location.origin);
        console.log('Calling logout from:' + window.location.origin);
        this.auth.logout({ logoutParams: { returnTo: window.location.origin } });

    }

}