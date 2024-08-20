import {Component, NgZone} from '@angular/core';
import {PersonSseService} from "../../services/person-sse.service";
import {count, Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  dataSource:any[]=[];
  private eventSource: EventSource | null = null;
  error: string = '';
  eventForm: FormGroup
  secondForm:FormGroup;
  countOfEventSource:number=1;
  secondCountOfEventSource:number=0;
    // private subscription: Subscription | undefined;
  // private subscription: Subscription | undefined;

  constructor(
    private personService: PersonSseService,
    private zone:NgZone,
    private fb:FormBuilder,

  ) {
    this.eventForm=this.fb.group({
      numberOfEvent: new FormControl('')
    })
    this.secondForm=this.fb.group({
      numberOfEvent: new FormControl('')
    })
  }

  ngOnInit() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    // this.subscription =this.personService.getServerSentEvent().subscribe({
    //   next: (data: any) => {
    //     console.log("start subscription")
    //     this.dataSource.push(JSON.parse(data.data));
    //   },
    //   error: (error: any) => {
    //     this.dataSource=[];
    //     console.error('Error: ', error);
    //     this.error = error
    //
    //   }
    //   });
    this.loadData();
  }
  loadData(){
    // this.eventSource = new EventSource("http://localhost:8080/person/get-all-person");
    // this.eventSource.onmessage = (event) => {
    //   this.zone.run(() => {
    //     this.dataSource.push(JSON.parse(event.data));
    //   });
    //   // this.dataSource.push(JSON.parse(event.data));
    // };
    // this.eventSource.onerror = (error) => {
    //   console.error('Error: ', error);
    //   this.closeEventSource();
    // };
    this.closeEventSource();
    this.eventSource = new EventSource("https://localhost:8443/user/get-all-users");
    this.eventSource.addEventListener('user',event => {
      this.zone.run(() => {
        this.dataSource.push(JSON.parse(event.data));
        this.dataSource.sort((a,b) => a.id - b.id);
      });
    })
    this.eventSource.addEventListener('keep-alive',event => {
      console.log("keep-alive");
    })
    this.eventSource.onerror = (error) => {
      console.error('Error: ', error);
      this.closeEventSource();
      this.dataSource=[];
    }
  }

  closeEventSource(){
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource=null;
    }
  }
  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    this.closeEventSource();
  }

  addNewEventSource(params:number ){
    for (let i = 0; i < params; i++) {
      this.eventSource = new EventSource("https://localhost:8443/user/get-all-users");
      this.eventSource.addEventListener('user',event => {
        this.zone.run(() => {
          this.dataSource.push(JSON.parse(event.data));
          this.dataSource.sort((a,b) => a.id - b.id);
        });
      })
      this.eventSource.addEventListener('keep-alive',event => {
        console.log("keep-alive");
      })
      this.eventSource.onerror = (error) => {
        console.error('Error: ', error);
        this.dataSource=[];
        this.closeEventSource();
      }
    }
    this.countOfEventSource+=params;
  }


  onSubmit(){
    this.addNewEventSource(this.eventForm.value.numberOfEvent);
  }

  secondSubmit(){
    this.secondAddNewEventSource(this.secondForm.value.numberOfEvent);
  }

  secondAddNewEventSource(params:number){
    for (let i = 0; i < params; i++) {
      this.eventSource = new EventSource("http://localhost:8080/person/get-all-person-test");
      this.eventSource.addEventListener('person',event => {
        this.zone.run(() => {
          this.dataSource.push(JSON.parse(event.data));
          this.dataSource.sort((a,b) => a.id - b.id);
        });
      })
      this.eventSource.addEventListener('keep-alive',event => {
        console.log("keep-alive");
      })
      this.eventSource.onerror = (error) => {
        console.error('Error: ', error);
        this.dataSource=[];
      }
    }
    this.secondCountOfEventSource+=params;
  }
}
