class NotedSearch extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const dropdownContainer = document.createElement('div');
        dropdownContainer.setAttribute('class', 'search-dropdown');
        shadow.appendChild(dropdownContainer);

        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search notes...');
        searchInput.classList.add('search-input');

        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fas', 'fa-search');
        searchIcon.setAttribute('aria-hidden', 'true');

        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchIcon);

        shadow.appendChild(searchContainer);

        searchInput.addEventListener('input', this.handleSearchInput.bind(this));

        const style = document.createElement('style');
        style.textContent = `
            :host {
                position: relative;
                display: flex;
                align-items: center;
            }

            input[type="text"] {
                padding: 5px 30px 5px 10px;
                border-radius: 5px;
                margin-right: 10px;
                border: 1px solid #ccc;
                flex: 1; 
            }

            .search-icon {
                position: absolute;
                right: 10px;
                color: #ccc;
                cursor: pointer;
            }

            .search-dropdown {
                position: absolute;
                z-index: 1;
                background-color: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px); 
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                max-height: 200px;
                overflow-y: auto;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: none;
                width: 100%; 
                top: calc(100% + 5px); 
                left: 0;
            }

            .search-dropdown-item {
                padding: 8px 16px;
                cursor: pointer;
            }

            .search-dropdown-item:hover {
                background-color: #F6995C;
                color: white;
            }
        `;
        shadow.appendChild(style);
    }

    handleSearchInput(event) {
        const searchValue = event.target.value.toLowerCase();
        const notes = document.querySelectorAll('.noted-card');

        const dropdownContainer = this.shadowRoot.querySelector('.search-dropdown');
        dropdownContainer.innerHTML = '';

        notes.forEach(note => {
            const title = note.querySelector('h3').textContent.toLowerCase();
            const body = note.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchValue) || body.includes(searchValue)) {
                const dropdownItem = document.createElement('div');
                dropdownItem.classList.add('search-dropdown-item');
                dropdownItem.textContent = note.querySelector('h3').textContent;
                dropdownItem.addEventListener('click', () => this.handleDropdownItemClick(note));
                dropdownContainer.appendChild(dropdownItem);
            }
        });

        if (dropdownContainer.children.length > 0) {
            dropdownContainer.style.display = 'block';
        } else {
            dropdownContainer.style.display = 'none';
        }
    }

    handleDropdownItemClick(noteElement) {
        const cardId = noteElement.id;
        const card = document.getElementById(cardId);
        if (card) {
            const notesContainer = document.querySelector('.notes-container');
            notesContainer.innerHTML = ''; 
            notesContainer.appendChild(card); 
            card.scrollIntoView({ behavior: 'smooth' });
        }
        this.shadowRoot.querySelector('.search-dropdown').style.display = 'none';
    }
}

customElements.define('noted-search', NotedSearch);
