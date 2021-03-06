import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseListObservable} from "angularfire2/database";
import {AuthService} from "../../providers/services/auth.services";
import {DataService} from "../../providers/services/data.services";
import {AvatarprofilesPage} from "../avatarprofiles/avatarprofiles";

/**
 * Generated class for the WookiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wookie',
  templateUrl: 'wookie.html',
})
export class WookiePage {
  item: any;
  $key: any;
  messages$: FirebaseListObservable<any[]>;
  placeholderText: string = 'Enter a message';
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public data: DataService) {
    this.item = navParams.get('item');
    this.messages$ = data.getChatMessagesW(this.$key);
  }

  public itemTapped(item) {
    this.navCtrl.push(AvatarprofilesPage, {
      item: item
    });
  }


  addbuddy() { // this is to add the buddy so we add this function to send the user to the page buddiesPage
    this.navCtrl.push('ChatsPage');
  }

  send(messageW: string) {
    this.messages$.push({
      createdAt: new Date().getTime(),
      from: this.auth.getName(),
      picprofile: this.auth.getUidPic(),
      text: messageW,
      uid: this.auth.getUserId()
    }).then(()=>
      this.content.scrollToTop(300)
    );
  }

 /* setPlaceholder(auth) {
    if (!auth.authenticated) {
      this.placeholderText = 'Please, login to post a message';
    }
  }
*/
  profileEdit() {
    this.navCtrl.push('ProfilePage');
  }


}
