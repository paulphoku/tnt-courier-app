import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[card-date]'
})
export class CardDateDirective {

    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
      const input = event.target as HTMLInputElement;
  
      let trimmed = input.value.replace(/\//g, '');
      if (trimmed.length > 4) {
        trimmed = trimmed.substr(0, 4);
      }
  
      let numbers = [];
      for (let i = 0; i < trimmed.length; i += 2) {
        numbers.push(trimmed.substr(i, 2));
      }
  
      input.value = numbers.join('/');
  
    }
  }