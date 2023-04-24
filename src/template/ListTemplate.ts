import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement
  static instance: ListTemplate = new ListTemplate()
  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement
  }
  clear(): void {
    this.ul.innerHTML = ``
  }
  render(fullList: FullList): void {
    this.clear()
    fullList.list.forEach((item) => {
      // <li class="item">
      //     <input type="checkbox" id="1">
      //     <label for="1">eat</label>
      //     <button class="button">X</button>
      // </li>
      const li = document.createElement('li') as HTMLLIElement
      li.classList.add('item')

      const check = document.createElement('input') as HTMLInputElement
      check.setAttribute('type', 'checkbox')
      check.setAttribute('id', item.id)
      check.checked = item.checked

      li.append(check)
      check.addEventListener('change', ()=>{
        item.checked = !item.checked
        fullList.save()
      })

      const label = document.createElement('label') as HTMLLabelElement
      label.setAttribute('for', item.id)
      label.textContent = item.item
      li.append(label)
      
      const button = document.createElement('button') as HTMLButtonElement
      button.classList.add('button')
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', ()=>{
        fullList.removeItem(item.id)
        this.render(fullList)
      })
      this.ul.append(li)
    })
  }
}