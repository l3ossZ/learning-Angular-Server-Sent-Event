import {Component} from '@angular/core';
import {PersonSseService} from "../../services/person-sse.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  dataSource: any[] = [];
  error: string = '';
  private subscription: Subscription | undefined;

  constructor(private personService: PersonSseService) {}

  ngOnInit() {
    this.subscription =this.personService.getServerSentEvent().subscribe(
      (data: any) => {
        this.dataSource.push(JSON.parse(data.data));
      },
      (error) => {
        this.error = error;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
