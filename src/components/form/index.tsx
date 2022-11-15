import React, { useState } from "react";
import { ITarefa } from "../../types/tarefa";
import Botao from "../button";
import style from './Form.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>
}


function Form({setTarefas}: Props) {
    const [tarefa, setTarefa] = useState('');
    const [tempo, setTempo] = useState("00:00");
    function adicionarTarefa(evento: React.FormEvent<HTMLFormElement>){
        evento.preventDefault();
        //aqui o setTaretas será atualizado com as Tarefas antigas + state
        setTarefas(tarefasAntigas => 
            [
                ...tarefasAntigas, 
                {
                    tarefa,
                    tempo,
                    selecionado: false,
                    completado: false,
                    //utilizando o gerador de id uuid
                    id: uuidv4()
                }
            
            ]);
            setTarefa("");
            setTempo("00:00");
    }
    return (
        //style.novaTarefa se refere à referência do módulo css
        //no submit do formulário, a função adicionarTarefa é chamada, modificando o this
        //o bind(this) se deve ao fato da função adicionarTarefa estar fora do escopo do return
        //evita-se isto usando function no lugar de class
        <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
            <div className={style.inputContainer}>
            <label htmlFor="tarefa">
                    Adicione um novo estudo
                </label>
                <input 
                    type="text" 
                    name="tarefa" 
                    id="tarefa"
                    value={tarefa}
                    //pega o evento de mudança e muda o estado virtual para o valor do campo
                    //essa chamada não tem efeito visual porque é chamada no virtual DOM
                    onChange={evento => setTarefa(evento.target.value)} 
                    placeholder="O que você quer estudar?" 
                    required/>
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="tempo">
                    Adicione um novo estudo
                </label>
                <input 
                    type="time" 
                    name="tempo"
                    value={tempo} 
                    id="tempo" 
                    step="1"
                    /*como o setState está sendo chamado em uma classe, não é necessário chamá-lo antes
                    assim, no onChange, o React recebe o evento, passa para o setState, que recebe
                    o objeto com a descontrução do state lá de cima, e como tempo recebe o valor
                    do target do evento */
                    onChange={evento => setTempo(evento.target.value)} 
                    min="00:00:00" 
                    max="01:30:00" 
                    required/>

            </div>
            <Botao type="submit" onClick={function (): void {
                throw new Error("Function not implemented.");
            } }>Adicionar</Botao>
        </form>
    )
}

export default Form;