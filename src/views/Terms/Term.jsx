import React from 'react';
import { Link } from "react-router-dom";

import { Pronunciation } from "../../components";
import { useAppPaths } from "../../hooks/routing";
import { useStateValue } from "../../store/store";

const Term = ({ payload }) => {
    const { DefinitionPath } = useAppPaths();
    const [{ language }] = useStateValue();
    const { definition, termId, termName, pronunciation } = payload;
    return (
        <>
            <dt>
                <dfn data-cdr-id={termId}>
                    <Link to={ DefinitionPath({ idOrName: termId }) }>{termName}</Link>
                </dfn>
            </dt>
            { pronunciation &&
                <dd className="pronunciation">
                    <Pronunciation lang={language} pronunciationObj={pronunciation} />
                </dd>
            }
            <dd className="definition" dangerouslySetInnerHTML={{ __html: definition.html }}></dd>
        </>
    )
};

export default Term;
