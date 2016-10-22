import React, { Component, PropTypes }      from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';

import { Card }         from 'material-ui/Card';

import CSSModules               from 'react-css-modules';
import styles                   from './FilmCard.less';

@inject('filmStore', 'viewStore') @observer @CSSModules(styles, { allowMultiple: true })
export default class FilmCard extends Component {
    static propTypes = {
        filmStore   : MobxTypes.observableObject,
        viewStore   : MobxTypes.observableObject,
        film        : PropTypes.object
    };

    toPascalCase = (text) => {
        return text.replace(/\w+/g, (w) => {
            return w[0].toUpperCase() + w.slice(1).toLowerCase();
        });
    }

    renderChips = () => {
        const { category } = this.props.film;

        if (!category) return null;

        return (
            <div styleName='chip'>
                <span>{category}</span>
            </div>
        );
    }

    render() {
        const { title, description, language, rating, releaseYear, actorNames } = this.props.film;
        const chipsList = this.renderChips();

        return (
            <Card
                styleName='FilmCard'
                style={{ marginBottom: 20, marginTop: 5 }}
                onTouchTap={this.handleSelectAudit}
            >
                <div styleName='header'>
                    <div styleName='chips'>
                        {chipsList}
                    </div>
                </div>
                <div styleName='title'>
                    <span>{title}</span>
                </div>
                <div styleName='info'>
                    <div><span styleName='bold'>{'Description: '}</span>{description}</div>
                    <div><span styleName='bold'>{'Language: '}</span>{language}</div>
                    <div><span styleName='bold'>{'Length: '}</span>{length}</div>
                    <div><span styleName='bold'>{'Rating: '}</span>{rating}</div>
                    <div><span styleName='bold'>{'Year: '}</span>{releaseYear}</div>
                    <div>
                        <span styleName='bold'>{'Actors: '}</span>
                        {
                            actorNames.map(item => {
                                return (
                                    <span key={item.id}>
                                        {`${this.toPascalCase(item.firstName)} ${this.toPascalCase(item.secondName)}, `}
                                    </span>
                                );
                            })
                        }
                    </div>
                </div>
            </Card>
        );
    }
}
