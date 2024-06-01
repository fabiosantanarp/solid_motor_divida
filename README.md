# Sistema de Motor de Dívida para para aplicação de conhecimentos do SOLID
## Rodar
- `docker run --name mysql-test -e MYSQL_ROOT_PASSWORD=root -d mysql`
- `mysql -h {seu_ip} -u root -proot < query.sql`
- `npx test`

## Regras PF Score de Risco
    Risco alto: Se o valor total das suas dívidas for superior a R$10.000,00 ou mais de 10 dívidas abertas de qualquer valor.
    Risco Médio: Se o valor total das suas dívidas for superior a R$5.000,00 ou mais de 5 dívidas abertas de qualquer valor.
    Risco Baixo - Qualquer dívida, independentemente do valor.

## Regras PF Score de Risco
    Risco alto: Se o valor total das suas dívidas for superior a R$50.000,00 ou mais de 20 dívidas abertas de qualquer valor.
    Risco Médio: Se o valor total das suas dívidas for superior a R$20.000,00 ou mais de 10 dívidas abertas de qualquer valor.
    Risco Baixo - Qualquer dívida, independentemente do valor.

### Princípios do SOLID:

- S - Single Responsibility Principle (Princípio da Responsabilidade Única):

Cada classe tem uma única responsabilidade bem definida. Por exemplo, CorporativeClient e IndividualClient têm a responsabilidade de representar os diferentes tipos de clientes e implementar os métodos relacionados a esses clientes.

- O - Open/Closed Principle (Princípio Aberto/Fechado):

O código está aberto para extensão, pois se pode adicionar novos tipos de clientes e implementar novas interfaces sem modificar as classes existentes. Por exemplo, se você quiser adicionar um novo tipo de cliente, poderia criar uma nova classe que implementa a interface apropriada sem modificar CorporativeClient ou IndividualClient.

- L - Liskov Substitution Principle (Princípio da Substituição de Liskov):

Como mencionado anteriormente, as classes derivadas (CorporativeClient e IndividualClient) podem ser substituídas pelas interfaces mais genéricas (ClientInterface, CorporateClientInterface, IndividualClientInterface) sem afetar o comportamento do programa.

- I - Interface Segregation Principle (Princípio da Segregação de Interfaces):

As interfaces são segregadas de acordo com as responsabilidades e funcionalidades relacionadas a cada tipo de cliente. Cada classe depende apenas da interface relevante para ela e não é forçada a implementar interfaces que não utiliza.

- D - Dependency Inversion Principle (Princípio da Inversão de Dependência):

Exemplo: A classe CalculateRisk depende da interface DebitRepositoryInterface, o que significa que ela está dependendo de uma abstração (a interface) em vez de depender diretamente de uma implementação específica do DebitRepository.
