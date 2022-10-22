import { link } from "fs";
import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {
    const [linkModels, setLinkModels] = useState<linkModel[]>([]);

    useEffect(() => {
        // voglio usare questa funz appena dopo il caricamento del componente
        const links: linkModel[] = [];
        const previousPageEnabled = props.currentPage !== 1;
        const previousPage = props.currentPage - 1;
        // compondo i buttons
        links.push({
            text: 'Previous',
            enabled: previousPageEnabled,
            page: previousPage,
            active: false
        });
        // numbers
        for (let i = 1; i <= props.totalAmountOfPages; i++) {
            if (i >= props.currentPage - props.radio &&
                i <= props.currentPage + props.radio) {
                links.push({
                    text: `${i}`,
                    enabled: true,
                    page: i,
                    active: props.currentPage === i
                });
            }
        }
        // next
        const nextPageEnabled = props.currentPage !== props.totalAmountOfPages &&
            props.totalAmountOfPages > 0;
        const nextPage = props.currentPage + 1;
        links.push({
            text: 'Next',
            enabled: nextPageEnabled,
            page: nextPage,
            active: false
        });

        setLinkModels(links);
    }, [props.currentPage, props.totalAmountOfPages, props.radio]);  // dependecies dell'hook

    function selectPage(link: linkModel) {
        if (link.page == props.currentPage) return; // non succede niente se clicco sulla stessa pagina
        if (!link.enabled) return;

        props.onChange(link.page);  // mando al parent component l'info della pagina cliccata
    }
    function getClass(link: linkModel) {
        if (link.active) return "active pointer";
        if (!link.enabled) return "disabled";
        return "pointer";
    }
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {linkModels.map(link =>
                    <li key={link.text}
                        onClick={() => selectPage(link)}
                        className={`page-item cursor ${getClass(link)}`}
                    >
                        <span className="page-link">
                            {link.text}
                        </span>
                    </li>)}
            </ul>
        </nav>
    )
}

interface linkModel {
    page: number;
    enabled: boolean;   // 
    text: string;   // testo del button
    active: boolean;    // segnala l'utente in che pagina è
}


interface paginationProps {
    currentPage: number;
    totalAmountOfPages: number;
    radio: number; // quanti numeri mostrare oltre alla pagina selezionata
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio: 3
}