import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    total_results: 0,
    imgs: [],
    error: null,
  }

  hendelerOnSubmit = (name) => {
    this.setState({
      query: name,
      page: 1,
      total_results: 0,
      imgs: [],
      error: null,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.getImages(query, page)
    }
  }
  hendlerLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))

  }
  getImages = async (query, page) => {
    try {
      const result = await ImageService.getImages(query, page)
      this.setState(prevState => ({ imgs: [...prevState.imgs, ...result.photos], total_results: result.total_results }))
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  render() {
    const { total_results, imgs, error, query } = this.state
    return (
      <>
        <SearchForm onSubmit={this.hendelerOnSubmit} />
        {error && <Text>Помилка: {error}</Text>}
        {imgs.length === 0 && query !== '' && <Text>Зображення за вашим запитом відсутні</Text>}
        <Grid>
          {imgs.length !== 0 && imgs.map(img => <GridItem key={img.id}>
            <CardItem color={img.avg_color}>
              <img src={img.src.large} alt={img.alt} />
            </CardItem>
          </GridItem>)}
        </Grid>
        {total_results !== imgs.length && <Button onClick={this.hendlerLoadMore}>Load more</Button>}
      </>
    );
  }
}
