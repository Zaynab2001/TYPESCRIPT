export enum Status {
    Read = 'Read',
    ReRead = 'Re-read',
    DNF = 'DNF',
    CurrentlyReading = 'Currently reading',
    ReturnedUnread = 'Returned Unread',
    WantToRead = 'Want to read'
  }
  
  export enum Format {
    Print = 'Print',
    PDF = 'PDF',
    Ebook = 'Ebook',
    AudioBook = 'AudioBook'
  }
  
  export class Book {
    constructor(
      public title: string,
      public author: string,
      public pages: number,
      public pagesRead: number,
      public status: Status,
      public format: Format,
      public suggestedBy: string ,
      public price: number ,
      public finished:boolean
    ) {}
  
    currentlyAt(): number {
      return this.pagesRead;
    }
  
    updateFinished(): void {
    this.finished = this.pagesRead >= this.pages;
    }
  }
  