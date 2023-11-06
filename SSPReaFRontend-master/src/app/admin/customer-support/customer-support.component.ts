import { Component, ElementRef, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { gptModels } from './constants';
import { ChatWithBot,ResponseModel } from './gpt-response';
import { debounce, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit {
chatConversation: ChatWithBot[]=[];
response!: ResponseModel | undefined;
    gptModels = gptModels
    promptText = '';
    showSpinner = false;
  clickSubscription: any;
  azalt:boolean=true;

  constructor(private el: ElementRef) { }
debouncedClick:any;
ngOnInit() {
  // DOM elementini seçmek için ElementRef kullanabilirsiniz veya ViewChild kullanabilirsiniz
  const button = this.el.nativeElement.querySelector('.btnSend');

  // Tıklama olayını dinlemek için RxJS kullanarak bir Observable oluşturun
  const clickEvent = fromEvent(button, 'click');

  // debounceTime operatörü ile tıklama olayını 200 ms geciktirin
  this.clickSubscription = clickEvent.pipe(debounceTime(1000)).subscribe(() => {
    this.checkResponse();
  });
}

ngOnDestroy() {
  if (this.clickSubscription) {
    this.clickSubscription.unsubscribe();
  }
}
  checkResponse() {
   
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
   
    
  }


  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.push(chatToPush);
  }


  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }

  async invokeGPT() {
   

    if(this.promptText.length<2)
    return;

    

   //try{
      this.response = undefined;
      
      let configuration = new Configuration({
        organization: "org-wMacGT3jQUGnQO7blyvLBZbM",
        apiKey:"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",
    });
      let openai = new OpenAIApi(configuration);
      
      

      let requestData={
        model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
        prompt: this.promptText,//this.generatePrompt(animal),
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      console.log(this.promptText);
      this.showSpinner = true;
      let apiResponse =  await openai.createCompletion(requestData);

      this.response = apiResponse.data as ResponseModel;
      this.pushChatContent(this.response.choices[0].text.trim(),'Mr Bot','bot');
debugger;
      this.showSpinner = false;
    // }catch(error:any) {
    //   this.showSpinner = false;
    //   // Consider adjusting the error handling logic for your use case
    //   if (error.response) {
    //     console.error(error.response.status, error.response.data);
        
    //   } else {
    //     console.error(`Error with OpenAI API request: ${error.message}`);
        
    //   }
    // }
  }
}