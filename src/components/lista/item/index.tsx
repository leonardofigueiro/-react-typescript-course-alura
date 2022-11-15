import { ITarefa } from '../../../types/tarefa';
import style from './Item.module.scss';

interface Props extends ITarefa {
    selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}

export default function Item(
    {
        tarefa,
        tempo,
        selecionado,
        completado,
        id,
        selecionaTarefa }: Props) {
    return (
        <li //caso o selecionado seja true, aplica o estilo itemSlecionado
            className={`${style.item} ${selecionado ? style.itemSelecionado : ''}
                        ${completado ? style.itemCompletado: ''}`} id={id}
            onClick={() => !completado && selecionaTarefa({
                tarefa,
                tempo,
                selecionado,
                completado,
                id
            })}>
            <h3>
                {tarefa}
            </h3>
            <span>
                {tempo}
            </span>
            {completado && <span className={style.concluido} aria-label="Tarefa completada"></span>}
        </li>

    )
}