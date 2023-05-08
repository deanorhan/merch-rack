export interface Problem {
  type: string;
  title: string;
  detail?: string;
}

export class GenericProblem implements Problem {
  readonly type: string;
  readonly title: string;
  detail?: string;

  constructor(type: string, title: string) {
    this.type = type;
    this.title = title;
  }
}
