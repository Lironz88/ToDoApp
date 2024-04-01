import {jwtDecode} from 'jwt-decode';
export class AuthState {
    userEmail: string = "";
    userType: string = "";
    userToken: string = "";
}
export enum AuthActionType {
    LoginUser = "LoginUser",
    LogoutUser = "LogOutUser",
    UpdateToken = "UpdateToken",
}

interface LoginUserAction {
    type: AuthActionType.LoginUser;
    payload: string; // Token string
}
interface LogoutUserAction {
    type: AuthActionType.LogoutUser;
}
interface UpdateTokenAction {
    type: AuthActionType.UpdateToken;
    payload: string; 
}

export type AuthAction = LoginUserAction | LogoutUserAction | UpdateTokenAction;

export function loginUser(userToken: string): LoginUserAction {
    return { type: AuthActionType.LoginUser, payload: userToken };
}

export function logOutUser(): LogoutUserAction {
    return { type: AuthActionType.LogoutUser };
}

export function updateToken(userToken: string): UpdateTokenAction {
    return { type: AuthActionType.UpdateToken, payload: userToken };
}

export function AuthReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.LoginUser:
            try {
                if (typeof action.payload === 'string') {
                    const token = action.payload.replace("Bearer ", "");
                    const decode = jwtDecode<any>(token);
                    if (decode && decode.userEmail && decode.sub) {
                        newState.userToken = action.payload;
                        newState.userEmail = decode.userEmail;
                        newState.userType = decode.sub;
                    } else {
                        console.error("Error: Decoded token is missing required fields.");
                    }
                } else {
                    console.error("Error: Payload is not a string.");
                }
            } catch (error) {
                console.error("Error decoding token", error);
            }
            break;
        case AuthActionType.LogoutUser:
            newState.userToken = "";
            newState.userEmail = "";
            newState.userType = "";
            break;
        case AuthActionType.UpdateToken:
            newState.userToken = action.payload;
            break;
    }

    return newState;
}
