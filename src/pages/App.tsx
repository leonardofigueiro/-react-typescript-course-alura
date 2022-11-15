import React, { useState } from 'react';
import { ITarefa } from '../types/tarefa';
import Cronometro from '../components/cronometro';
import Form from '../components/form';
import Lista from '../components/lista';
import style from './App.module.scss';

function App() {
	const [tarefas, setTarefas] = useState<ITarefa[]>([]);
	const [selecionado, setSelecionado] = useState<ITarefa>()

	function selecionaTarefa(tarefaSelecionada: ITarefa) {
		setSelecionado(tarefaSelecionada);
		//iterando sobre todas as tarefas
		setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => ({
			...tarefa, 
			//caso o id da tarefa seja igual o da tarefa selecionada, muda o estado 
			//selecionado para true
			selecionado: tarefa.id === tarefaSelecionada.id ? true : false
		})))
	}
	function finalizarTarefa() {
		if(selecionado) {
			setSelecionado(undefined);
			setTarefas(tarefasAnteriores => tarefasAnteriores.map(tarefa => {
				if(tarefa.id === selecionado.id) {
					return {
						...tarefa,
						selecionado: false,
						completado: true
					}
				}
				return tarefa;
			}))
		}
	}
	return (
		<div className={style.AppStyle}>
			{/* para o form é passado o setTarefas */}
			<Form setTarefas={setTarefas} />
			{/* para a lista são passadas as tarefas */}
			<Lista 
				tarefas={tarefas} 
				selecionaTarefa = {selecionaTarefa}
				/>
			<Cronometro 
				selecionado={selecionado}
				finalizarTarefa = {finalizarTarefa}
				/>
		</div>
	);
}

export default App;
