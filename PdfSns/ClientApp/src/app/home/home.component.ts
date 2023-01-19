import { Component } from '@angular/core';
import * as AWS from "aws-sdk";
import { CredentialsOptions } from 'aws-sdk/lib/credentials';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public connectToSNS(): void {
    let credentials: CredentialsOptions = {
      accessKeyId: "AKIAXJFSLZOGB3DGNQF5",
      secretAccessKey: "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"
    };
    AWS.config.update({ region: 'us-east-1', credentials: credentials });
    let params = {
      Protocol: "SQS",
      TopicArn: 'arn:aws:sns:us-east-1:500737756044:dinagat-notification.fifo', /* required */
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
