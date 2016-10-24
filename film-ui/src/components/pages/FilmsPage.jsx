import React, { Component } from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';

import CSSModules               from 'react-css-modules';
import RaisedButton             from 'material-ui/RaisedButton';
import RefreshIndicator         from 'material-ui/RefreshIndicator';
import AutoComplete             from 'material-ui/AutoComplete';
import TextField                from 'material-ui/TextField';
import FilmCard                 from '../widgets/FilmCard.jsx';
import styles                   from './FilmsPage.less';

@inject('filmStore', 'viewStore') @observer @CSSModules(styles)
export default class FilmsPage extends Component {
    static propTypes = {
        filmStore : MobxTypes.observableObject,
        viewStore : MobxTypes.observableObject
    };

    componentWillMount() {
        const { filmStore } = this.props;

        filmStore.fetchFilterData();
    }

    handleInputChange = (type, e, value) => {
        const { filmStore } = this.props;

        filmStore.query[type] = value;
        filmStore.fetchFilms();
    }

    handleAutoInputChange = (type, value) => {
        const { filmStore } = this.props;

        filmStore.query[type] = value;
        filmStore.fetchFilms();
    }

    handleChangePage = (type) => {
        const { filmStore } = this.props;

        if (type === 'inc') {
            ++filmStore.page;
        } else {
            --filmStore.page;
        }
    }

    renderFilms() {
        const { films } = this.props.filmStore;

        return films.map(film => {
            return (
                <FilmCard
                    key={film.id}
                    film={film}
                />
            );
        });
    }

    renderSearchForm() {
        const { filters } = this.props.filmStore;

        return (
            <div styleName='searchForm'>
                <TextField
                    floatingLabelText='Title'
                    type='text'
                    style={{ maxWidth: 130 }}
                    onChange={this.handleInputChange.bind(this, 'title')}
                />
                <TextField
                    floatingLabelText='Description'
                    type='text'
                    style={{ maxWidth: 130 }}
                    onChange={this.handleInputChange.bind(this, 'description')}
                />
                <AutoComplete
                    floatingLabelText='Category'
                    filter={AutoComplete.caseInsensitiveFilter}
                    textFieldStyle={{ maxWidth: 130 }}
                    style={{ maxWidth: 130 }}
                    onUpdateInput={this.handleAutoInputChange.bind(this, 'category')}
                    onNewRequest={this.handleAutoInputChange.bind(this, 'category')}
                    dataSource={filters.categories}
                />
                <AutoComplete
                    floatingLabelText='Actor'
                    filter={AutoComplete.caseInsensitiveFilter}
                    textFieldStyle={{ maxWidth: 130 }}
                    style={{ maxWidth: 130 }}
                    onUpdateInput={this.handleAutoInputChange.bind(this, 'actor')}
                    onNewRequest={this.handleAutoInputChange.bind(this, 'actor')}
                    dataSource={filters.actors}
                />
                <AutoComplete
                    floatingLabelText='Language'
                    filter={AutoComplete.caseInsensitiveFilter}
                    textFieldStyle={{ maxWidth: 130 }}
                    style={{ maxWidth: 130 }}
                    onUpdateInput={this.handleAutoInputChange.bind(this, 'language')}
                    onNewRequest={this.handleAutoInputChange.bind(this, 'language')}
                    dataSource={filters.languages}
                />
            </div>
        );
    }

    render() {
        const { filmStore } = this.props;
        const { isLoading } = filmStore;
        const filmsList = this.renderFilms();

        return (
            <div styleName='FilmsPage' >
                <div styleName='header'>
                    <div styleName='navigation'>
                        <RaisedButton
                            key='Previos'
                            label='Previous  page'
                            disabled={filmStore.page === 1}
                            primary
                            style={{ width: 136 }}
                            onTouchTap={this.handleChangePage}
                        />
                        <div>
                            {`${filmStore.page} / ${filmStore.lastPage}`}
                        </div>
                        <RaisedButton
                            key='Next'
                            label='Next page'
                            disabled={filmStore.page === filmStore.lastPage}
                            primary
                            style={{ width: 136 }}
                            onTouchTap={this.handleChangePage.bind(this, 'inc')}
                        />
                    </div>
                    {this.renderSearchForm()}
                </div>

                <div ref={content => this.content = content} styleName='content'>
                    <div styleName='filmsList'>
                        {filmsList}
                    </div>
                    <div styleName='loadingSection'>
                        {
                            isLoading
                                ? <RefreshIndicator
                                    size={40}
                                    top={0}
                                    left={0}
                                    status='loading'
                                    style={{ position: 'relative' }}
                                  />
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
