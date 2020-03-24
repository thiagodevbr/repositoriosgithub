/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaMinus } from 'react-icons/fa';
import {
  Form,
  SubmitButton,
  WarningRepository,
  List,
  RemoveButton,
} from './style';
import api from '../../services/api';
import Container from '../../components/Container/index';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    erroApi: '',
  };

  componentDidMount() {
    if (localStorage.getItem('repositories')) {
      this.setState({
        repositories: JSON.parse(localStorage.getItem('repositories')),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleRepository = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const checkRepo = repositories.filter((repo) => repo.name === newRepo);

    if (checkRepo.length === 1) {
      this.setState({ erroApi: 'Repositório já existe' });
      this.setState({ loading: false, newRepo: '' });
    } else {
      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };
        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          erroApi: '',
        });
      } catch (err) {
        this.setState({ erroApi: 'Insira um repositório válido', newRepo: '' });
      }
    }

    this.setState({ loading: false });
  };

  handleDelete = (name) => {
    const { repositories } = this.state;
    const newRepositories = repositories.filter((repo) => repo.name !== name);
    this.setState({ repositories: newRepositories });
  };

  render() {
    const { newRepo, loading, erroApi, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={newRepo}
            placeholder="Adicionar repositório"
            onChange={this.handleRepository}
          />
          <SubmitButton loading={loading} empty={newRepo}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {erroApi && <WarningRepository>{erroApi}</WarningRepository>}
        <List>
          {repositories.map((repo) => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
              <RemoveButton>
                <FaMinus
                  onClick={() => this.handleDelete(repo.name)}
                  color="#fff"
                  size={14}
                />
              </RemoveButton>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
