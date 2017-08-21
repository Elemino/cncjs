import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import i18n from '../../lib/i18n';
import {
    WORKFLOW_STATE_IDLE
} from '../../constants';
import styles from './index.styl';

class Macro extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    render() {
        const { state, actions } = this.props;
        const { port, workflowState, macros = [] } = state;
        const canClick = port && workflowState === WORKFLOW_STATE_IDLE;

        return (
            <div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <tbody>
                            {macros.length === 0 &&
                                <tr>
                                    <td colSpan="2">
                                        <div className={styles.emptyResult}>
                                            {i18n._('No macros')}
                                        </div>
                                    </td>
                                </tr>
                            }
                            {macros.length > 0 && macros.map((macro, index) => (
                                <tr key={macro.id}>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-default"
                                            disabled={!canClick}
                                            onClick={() => {
                                                const { id } = macro;
                                                actions.openRunMacroModal(id);
                                            }}
                                            title={i18n._('Run Macro')}
                                        >
                                            <i className="fa fa-play" />
                                        </button>
                                        <span className="space" />
                                        {macro.name}
                                    </td>
                                    <td style={{ width: '1%' }}>
                                        <div className="nowrap">
                                            <button
                                                type="button"
                                                className="btn btn-xs btn-default"
                                                disabled={!canClick}
                                                onClick={() => {
                                                    const { id, name } = macro;
                                                    actions.confirmLoadMacro({ name })
                                                        .then(() => {
                                                            actions.loadMacro(id, { name });
                                                        });
                                                }}
                                                title={i18n._('Load Macro')}
                                            >
                                                <i className="fa fa-chevron-up" />
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-xs btn-default"
                                                onClick={() => {
                                                    actions.openEditMacroModal(macro.id);
                                                }}
                                            >
                                                <i className="fa fa-edit" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Macro;
