import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  // Testo del bottone
  @Input() label = 'Cerca';

  // Tipo del bottone (submit, button, reset)
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  // Disabilitato o no
  @Input() disabled = false;

  // Evento click verso il componente padre
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
