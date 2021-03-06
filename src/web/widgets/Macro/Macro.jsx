import chainedFunction from 'chained-function';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button } from '../../components/Buttons';
import Modal from '../../components/Modal';
import i18n from '../../lib/i18n';
import portal from '../../lib/portal';
import {
    // Workflow
    WORKFLOW_STATE_IDLE,
    WORKFLOW_STATE_PAUSED
} from '../../constants';
import styles from './index.styl';

class Macro extends PureComponent {
    static propTypes = {
        state: PropTypes.object,
        actions: PropTypes.object
    };

    render() {
        const { state, actions } = this.props;
        const {
            canClick,
            workflow,
            macros = []
        } = state;
        const canRunMacro = canClick && includes([WORKFLOW_STATE_IDLE, WORKFLOW_STATE_PAUSED], workflow.state);
        const canLoadMacro = canClick && includes([WORKFLOW_STATE_IDLE], workflow.state);

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
                                            disabled={!canRunMacro}
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
                                                disabled={!canLoadMacro}
                                                onClick={() => {
                                                    const { id, name } = macro;

                                                    portal(({ onClose }) => (
                                                        <Modal onClose={onClose}>
                                                            <Modal.Header>
                                                                <Modal.Title>
                                                                    {i18n._('Load Macro')}
                                                                </Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                {i18n._('Are you sure you want to load this macro?')}
                                                                <p><strong>{name}</strong></p>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button
                                                                    onClick={onClose}
                                                                >
                                                                    {i18n._('No')}
                                                                </Button>
                                                                <Button
                                                                    btnStyle="primary"
                                                                    onClick={chainedFunction(
                                                                        () => {
                                                                            actions.loadMacro(id, { name });
                                                                        },
                                                                        onClose
                                                                    )}
                                                                >
                                                                    {i18n._('Yes')}
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    ));
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
