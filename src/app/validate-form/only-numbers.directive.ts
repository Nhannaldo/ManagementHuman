import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      '/',
    ];
    if (
      allowedKeys.indexOf(event.key) !== -1 ||
      (event.key >= '0' && event.key <= '9')
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
