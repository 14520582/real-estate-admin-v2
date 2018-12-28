export interface ConnectionStatus {
    who: string;
    last: Date;
}

export interface Call {
    target: string;
    type: string;

}
export class Utils {
    static currentFullUser: any;
  
    static getFullCurrentUser() {
      if (!Utils.currentFullUser) {
        Utils.currentFullUser = JSON.parse(localStorage.getItem('userData'));
      }
      return Utils.currentFullUser;
    }
  
  
    static getCurrentToken() {
      const data = Utils.getFullCurrentUser();
      if (data) {
        return data.token;
      }
      return null;
    }
}