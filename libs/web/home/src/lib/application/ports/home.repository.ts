import { Project } from '@web/projects';
import { Observable } from 'rxjs';

export abstract class HomeRepository {
  abstract getProducts(): Observable<Array<Project>>;
}
