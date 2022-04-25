import { renderChange,CategoryRender} from "./state.js";

function RenderTodo(){
    document.getElementById('list-items').innerHTML=''
    document.getElementById('list-category-items').innerHTML=''
    renderChange();
    CategoryRender();
}

export default RenderTodo;