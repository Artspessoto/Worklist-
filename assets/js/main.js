const inputTarefa = document.querySelector('.new-work');
const listaTarefas = document.querySelector('.works');
const botaoTarefa = document.querySelector('.btn-create');

//pra quando a tarefa for digitada no input e clicar enter, crie a tarefa
//keyup é pra quando a tecla é pressionada e "solta" e keydown é quando a tecla se mantém pressionada
inputTarefa.addEventListener('keypress', (e) =>{
    if(e.keyCode == 13){
        if(!inputTarefa.value) return ; //se o input estiver vazio retorna nada
        createWork(inputTarefa.value);
    }
});

//limpar o input após a criação da tarefa
function clearInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

//criação da list que posteriormente vai ser inserida dentro da ul
function createList(){
   const li = document.createElement('li');
   return li;
}

//cria a tarefa dentro do input
function createWork(textInput){
    const list = createList(); //cria a li
    list.innerHTML = textInput; //o texto do input vai ser uma li
    listaTarefas.appendChild(list); //a classe ul vai receber um elemento filho que é a li
    clearInput();
    buttonErase(list); //o button é criado e se torna elemento filho da li
    saveWorks(); //salvar as tarefas criadas
}

//criar button para apagar as li(tarefas registradas)
function buttonErase(li){
    li.innerText += '   '; //como o texto já está lá, criar um espaço
    const eraseWork = document.createElement('button');
    eraseWork.innerText = 'Apagar';
    eraseWork.setAttribute('class', 'apagar');
    eraseWork.setAttribute('title', 'Apagar essa tarefa');
    eraseWork.classList.add('btn-erase');
    li.appendChild(eraseWork);
}


//evento de click do button faz registrar essa nova tarefa e exibe dentro da ul
botaoTarefa.addEventListener('click', () =>{
    if(!inputTarefa.value) return ;
    createWork(inputTarefa.value);
})


//apagar as tarefas
document.addEventListener('click', (e) =>{
    const element = e.target; //pega o evento do elemento selecionado
    
    //verificação para saber se o elemento selecionado é o botão apagar
    //o button vai precisar apagar o elemento pai dele, que no caso é a li(a tarefa criada)
    if(element.classList.contains('apagar')){
        element.parentElement.remove();
        saveWorks();
    }
})

//salvar as tarefas
function saveWorks(){
    //precisa capturar todas as li criadas dentro da ul(listaTarefas)
    const liWorks = listaTarefas.querySelectorAll('li');
    const listWorks = [];

    for (let work of liWorks){
        let textOfWork = work.innerText;
        textOfWork = textOfWork.replace('Apagar', '').trim();//subtituir a palavra apagar por nada
        //trim tira o espaço vazio da string dentro do array
        listWorks.push(textOfWork); //salvando no array
    }
    //foi criado uma string do array convertido para JSON
    //em resumo, para salvar precisa converter o array em string
    //ele converteu um elemento javaScript em uma string no formato JSON
    const worksJSON = JSON.stringify(listWorks);
    localStorage.setItem('works', worksJSON); //é uma "mini base de dados do navegador"
}

//para que quando tenha refresh da page as li estejam listadas lá ainda
//vai ler as tarefas e "jogar de volta na ul"
function addSaveWorks(){
    //capturar os itens salvos no localStorage do navegador
    const work = localStorage.getItem('works'); //nome setado anteriormente

    //converter a string salva on localStorage em array novamente
    //JSON.parse() << converter novamente a string JSON para um formato javaScript
    const listOfWorks = JSON.parse(work);

    for( let tarefas of listOfWorks){
        createWork(tarefas);
    }
}

addSaveWorks();