class NotedCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.classList.add('noted-card');

        const style = document.createElement('style');
        style.textContent = `
        .noted-card {
            background: rgba(255, 255, 255, 0.15); 
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1); 
            border-radius: 15px; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            padding: 10px;
        }
        
        .noted-card h3 {
            color: white;
            font-weight: bold;
            margin: 0;
        }
        
        .noted-card p {
            color: whitesmoke;
            font-weight: 300;
            margin: 0;
        }
        
        .note-info {
            margin-top: 5px;
            font-size: 12px;
            color: #F6995C;
        }
        
        .edit-btn,
        .delete-btn {
            padding: 5px 10px;
            margin-right: 5px;
            background-color: #579d8e; 
            color: whitesmoke;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        
        }
        
        .delete-btn {
            background-color: #c38b5b; 
        }
        
        .edit-btn:hover,
        .delete-btn:hover {
            opacity: 0.8;
        }
        `;

        shadow.appendChild(style);
        shadow.appendChild(card);
    }

    connectedCallback() {
        const { title, body, createdAt } = this.dataset;

        this.shadowRoot.querySelector('.noted-card').innerHTML = `
            <h3>${title}</h3>
            <p>${body}</p>
            <h5 class="note-info">${new Date(createdAt).toLocaleString()}</h5>
            <button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>
            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        `;
        this.setAttribute('data-title', title);
        this.setAttribute('data-body', body);
    }
}

customElements.define('noted-card', NotedCard);
