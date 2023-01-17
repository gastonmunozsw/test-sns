import { Component } from '@angular/core';
import * as AWS from "aws-sdk";
import { SubscribeInput } from 'aws-sdk/clients/sns';
import { CredentialsOptions } from 'aws-sdk/lib/credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sns-test';

  public connectToSNS(): void {
    let credentials: CredentialsOptions = {
      accessKeyId: "",
      secretAccessKey: ""
    };
    AWS.config.update({ region: 'us-east-1', credentials: credentials });
    let params: SubscribeInput = {
      Protocol: "https",
      TopicArn: 'arn:aws:sns:us-east-1:500737756044:dinagat-topic', /* required */
      Endpoint: window.location.href
    };

    // Create promise and SNS service object
    let subscribePromise = new AWS.SNS({ apiVersion: '2010-03-31' }).subscribe(params).promise();

    // Handle promise's fulfilled/rejected states
    subscribePromise.then(
      (data: any) => {
        console.log("Subscription ARN is " + data.SubscriptionArn);
      });
    subscribePromise.catch((err: any) => {
      console.log(err);
    })
  }
}
