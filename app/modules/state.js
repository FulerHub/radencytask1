import createItemTemplate from "../templates/ItemTemplate.js";
import createCategoryItemTemplate from "../templates/CategoryItemTemplate.js";
import RenderTodo from "./render.js";
import createSelectTemplate from "../templates/SelectTemplate.js";

export let todo = [
    {name:"Shopping List",created: 1650736070923,category:0, content:"Tomatoes,bread",edit:false,archive:true},
    {name:"The theory of evolute",created: 1650736070924,category:2, content:" I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” ",edit:false,archive:false},
    {name:"New Feature",created: 1650736070925,category:1, content:" I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” ",edit:false,archive:true},
    {name:"William Gaddis",created: 1650736070926,category:0, content:"Power doesn't gonna have a dentist appointment on the 3/5/2021,",edit:false,archive:false},
    {name:"Books",created: 1650736070927,category:2, content:"The Learn Startup",edit:false,archive:false},
];
export let renderedTodo = [];
export let categoriesTodo =[
    {img:'<i class="fa fa-shopping-cart" aria-hidden="true"></i>',name:"Task"},
    {img:'<i class="fa fa-bullhorn" aria-hidden="true"></i>',name:"Random Thought"},
    {img:'<i class="fa fa-lightbulb-o" aria-hidden="true"></i>',name:"Idea"},
];

function Task(name, content, category=0,date) {
    this.name = name;
    this.created = Date.now();
    this.category = category;
    this.content = content;
    this.date = date;
    this.archive=false;
    this.edit =false;
}

export const renderChange = ()=>{
    let archive = todo.filter(item => item.archive)
    let archiveNone = todo.filter(item => !item.archive)
    todo = [...archiveNone,...archive];
    let virtualTasks = todo.map((item) => createItemTemplate(item))
    virtualTasks.forEach( element => {document.getElementById('list-items').innerHTML += element;})
    renderedTodo = document.querySelectorAll('.todo__item');
    renderedTodo.forEach((element,index)=>{
        element.querySelector('.edit').addEventListener('click',() => editTodo(index));
        element.querySelector('.archive').addEventListener('click',() => archiveTodo(index));
        element.querySelector('.delete').addEventListener('click',() => deleteTodo(index));
        if(todo[index].edit) element.querySelector('.item-category').innerHTML = createSelectTemplate(categoriesTodo,todo[index].category);
    })
}

export const CategoryRender = ()=>{
    let virtualCategories = categoriesTodo.map((category,index) => {
        let activeTodo = todo.filter(item => !item.archive && item.category === index)
        let archiveTodo = todo.filter(item => item.archive && item.category === index)
        return createCategoryItemTemplate(category,activeTodo.length,archiveTodo.length)
    })
    virtualCategories.forEach( element => {document.getElementById('list-category-items').innerHTML += element;})
}

export const addTask = (name,content,category,date)=>{
    todo.push(new Task(name,content,parseInt(category),date))
}


const editTodo = (id)=> {
    if(todo[id].edit){
        let name = renderedTodo[id].querySelector('.item-name').value;
        let category = renderedTodo[id].querySelector('.item-category select').value;
        let content = renderedTodo[id].querySelector('.item-content').value
        todo = todo.map((item,index) => index === id ?  {...item,name: name,category:category,content: content} : item)
    }
    todo = todo.map((item,index) => index === id ?  {...item, edit: !item.edit } : item)
    RenderTodo();
}

const archiveTodo = (id)=> {
    todo = todo.map((item,index) => index === id ?  {...item, archive: !item.archive } : item)
    RenderTodo();
}

const deleteTodo = (id) => {
    todo = todo.filter((item,index) => index != id);
    RenderTodo();
}