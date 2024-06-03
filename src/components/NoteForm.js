class NotedForm extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const form = document.createElement('form');
        const titleLabel = document.createElement('label');
        const titleInput = document.createElement('input');
        const descLabel = document.createElement('label');
        const descTextarea = document.createElement('textarea');
        const submitBtn = document.createElement('button');

        titleLabel.textContent = 'Title:';
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', 'titleInput');
        titleInput.setAttribute('required', '');
        descLabel.textContent = 'Description:';
        descTextarea.setAttribute('id', 'bodyInput');
        descTextarea.setAttribute('required', '');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Add Note';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descLabel);
        form.appendChild(descTextarea);
        form.appendChild(submitBtn);

        const style = document.createElement('style');
        style.textContent = `
            form {
                display: grid;
                gap: 10px;
                max-width: 300px; 
            }
        
            label {
                font-weight: bold;
                color: whitesmoke;
            }
        
            input[type="text"],
            textarea {
                width: 100%;
                padding: 5px;
                border-radius: 5px;
                max-width: 100%; 
                box-sizing: border-box; 
                background-color: whitesmoke;
            }
        
            button {
                padding: 8px 16px;
                background-color: #F6995C;
                border-radius: 5px;
                color: whitesmoke;
                border: none;
                cursor: pointer;
                max-width: 100%;
                box-sizing: border-box;
            }
        
            button:hover {
                background-color: #d46c25;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(form);

        this.attachEvents();
    }

    attachEvents() {
        const form = this.shadowRoot.querySelector('form');
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const titleInput = this.shadowRoot.getElementById('titleInput');
        const bodyInput = this.shadowRoot.getElementById('bodyInput');

        const newNoteEvent = new CustomEvent('newNote', {
            bubbles: true,
            composed: true,
            detail: {
                title: titleInput.value,
                body: bodyInput.value
            }
        });
        this.dispatchEvent(newNoteEvent);

        titleInput.value = '';
        bodyInput.value = '';
    }
}

customElements.define('noted-form', NotedForm);
