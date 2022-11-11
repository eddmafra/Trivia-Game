import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testar a tela de Login', () => {
  it('Verificar se há campos de nome e email', () => {
    renderWithRouterAndRedux(<App />);
    const checkEmail = screen.getByPlaceholderText(/email/i);
    expect(checkEmail).toBeInTheDocument();
    const checkSenha = screen.getByPlaceholderText(/Insira seu nome/i);
    expect(checkSenha).toBeInTheDocument();
  });
  it('Verificar se o botão consta desabilitado caso o nome e e-mail não forem preenchidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Play/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    userEvent.type(inputName, 'Meu Nome');
    userEvent.type(inputEmail, 'email@email.com');
    expect(btn).toBeEnabled();
    userEvent.click(btn);
    expect(history.location.pathname).toBe('/jogodetrivia');
  });
  it('Verificar se há um botão que direciona para Configurações ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const checkBtn = screen.getByTestId('btn-settings');
    expect(checkBtn).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Configurações/i });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    expect(history.location.pathname).toBe('/settings');
  });
});
