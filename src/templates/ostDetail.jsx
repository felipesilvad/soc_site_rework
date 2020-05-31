import React from 'react'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Container, Button, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

export default class OstDetail extends React.Component {
  state = {
    ost: {
      platforms: [],
      games: [],
      artists: [],
      classes: [],
      types: []
    }
  }

  componentDidMount () {
    const query = gql`
      query Ost ($id: ID) {
        ost(id: $id){
          title
          subTitle
          releaseDate
          platforms {
            id
            name
          }
          games {
            slug
            name
          }
          artists {
            id
            name
          }
          classes {
            name
          }
          types {
            name
          }
        }
      }
    `
    this.props.client.query({ query, variables: { id: this.props.ost } }).then(results => {
      this.setState({ ost: results.data.ost })
    }).catch(err => {
      console.log(err)
      toast.error('Failed to fetch server info')
    })
  }

  render () {
    return (
      <div className='ost-container' style={{ backgroundImage: 'url({{this.state.ost.cover.url})' }}>
        <div className='background-overlay'>
          <Container>
            <div className='ost-detail'>
              <Row>
                <Col lg={5}><img className='img-fluid' src='{this.state.ost.cover.url }' /></Col>
                <Col lg={7} className='blackblock'>
                  <Row><Col><h1 className='text-center ost-title'>{this.state.ost.title}</h1></Col></Row>
                  <Row><Col><h6 className='text-center tracklist'>{this.state.ost.subTitle}</h6></Col></Row>
                  <table className='table table-dark'>
                    <tbody>
                      <tr>
                        <th className='width-row'>Release Date</th>
                        <td>{this.state.ost.releaseDate}</td>
                      </tr>

                      {this.state.ost.artists.length > 0 ? (
                        <tr>
                          <th>Composers</th>
                          <td>
                            {this.state.ost.artists.map(({ id, name }) => name).join(', ')}
                          </td>
                        </tr>
                      ) : null}

                      <tr>
                        <th>Classification</th>
                        <td>
                          {this.state.ost.classes.map(({ name }) => `${name} Soundtrack`).join(' & ')}
                          {' - '}{this.state.ost.types.map(({ name }) => name).join(', ')}
                        </td>
                      </tr>
                      {this.state.ost.label ? (
                        <tr>
                          <th>Published by</th>
                          <td>{this.state.ost.label}</td>
                        </tr>
                      ) : null}
                      {this.state.ost.platforms.length > 0 ? (
                        <tr>
                          <th>Platforms</th>
                          <td>
                            {this.state.ost.platforms.map(({ id, name }) => <a key={id} href={`/platform/${id}`}>{name}</a>)}
                          </td>
                        </tr>
                      ) : null}

                      {this.state.ost.games.length > 0 ? (
                        <tr>
                          <th>Games</th>
                          <td>
                            {this.state.ost.games.map(({ slug, name }) => <a key={slug} href={`/game/${slug}`}>{name}</a>)}
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>

            <hr className='style2 style-white' />

            <div className='row'>
              <div className='col-lg-6'>
                <div className='blackblock h-100 d-inline-block'>
                  <h1 className='text-center ost-title'>TRACKLIST</h1>
                  <h6 className='tracklist'>{this.state.ost.tracklist}</h6>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='blackblock'>
                  <p className='pl-2'>Check album at:</p>
                  {/* % if this.state.ost.vgmdb_link % */}
                  <a target='_blank' href='{this.state.ost.vgmdb_link }'><img width='100px' src='https://vgmdb.net/db/img/vgmdblogo.png' /></a>
                  {/* % endif % */}
                  <div className='red-block mt-2'>
                    <h1 className='text-center ost-title'>Buy The Original Soundtrack to support the artists</h1>

                    <table>
                      <tr>
                        {/* % if this.state.ost.amazon_html % */}
                        <td className='amazon-html'>
                          <div>{this.state.ost.amazon_html}</div>
                        </td>
                        {/* % endif % */}
                        {/* % if this.state.ost.amazon_link % */}
                        <td>
                          <div className='links-list'>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.amazon_link % */}
                              <a target='_blank' href='{{this.state.ost.amazon_link}'><img className='link-img' src='/static/amazon_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.amazon_jp % */}
                              <a target='_blank' href='{{this.state.ost.amazon_jp}'><img className='link-img' src='/static/amazon_jp.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.play_asia_link % */}
                              <a target='_blank' href='{{this.state.ost.play_asia_link}'><img className='link-img' src='/static/play_asia_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.cd_japan_link % */}
                              <a target='_blank' href='{{this.state.ost.cd_japan_link}'><img className='link-img' src='/static/cd_japan_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.spotify_link % */}
                              <a target='_blank' href='{{this.state.ost.spotify_link}'><img className='link-img' src='/static/spotify_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.google_play % */}
                              <a target='_blank' href='{{this.state.ost.google_play}'><img className='link-img' src='/static/google_play.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.steam % */}
                              <a target='_blank' href='{{this.state.ost.steam}'><img className='link-img' src='/static/steam.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.mora % */}
                              <a target='_blank' href='{{this.state.ost.mora}'><img className='link-img' src='/static/mora.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.itunes % */}
                              <a target='_blank' href='{{this.state.ost.itunes}'><img className='link-img' src='/static/itunes.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div className='links-list-items'>
                              {/* % if this.state.ost.ototoy % */}
                              <a target='_blank' href='{{this.state.ost.ototoy}'><img className='link-img' src='/static/ototoy.jpg' /></a>
                              {/* % endif % */}
                            </div>
                          </div>
                        </td>
                        {/* % endif % */}
                      </tr>
                    </table>

                  </div>

                  <div className='mt-3'>
                    <div className='col-xs-1 text-center'><h2 className='text-center ost-title'>MP3</h2></div>
                    {/* % if this.state.ost.download_link_1 % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_1}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_1 }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_1_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_2 % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_2}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_2 }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_2_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_3 % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_3}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_3 }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_3_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_1_flac or this.state.ost.download_link_2_flac or this.state.ost.download_link_3_flac % */}
                    <div className='col-xs-1 text-center mt-3'><h2 className='text-center ost-title'>FLAC</h2></div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_1_flac % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_1_flac}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_1_flac }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_1_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_2_flac % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_2_flac}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_2_flac }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_2_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.state.ost.download_link_3_flac % */}
                    <div className='col-xs-1 text-center'>{this.state.ost.download_link_choices_3_flac}</div>
                    <div className='col-xs-1 text-center'>
                      <button className='download-button col-lg-6'><a target='_blank' className='dla' href='{this.state.ost.download_link_3_flac }'>DOWNLOAD</a></button>
                      <button className='download-button-soc col-lg-6'><a target='_blank' className='dlas' href='{this.state.ost.download_link_3_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                  </div>

                </div>

              </div>

              <div className='blackblock w-100 m-3'><h1 className='text-center ost-title'>RELATED SOUNDTRACKS</h1></div>

              <div className='links-list w-100 m-3'>
                {/* % for ost in this.state.ost.releated_this.state.ost.all % */}
                <div className='ost-list-items'>
                  <a href='/ost/{{this.state.ost.slug}'>
                    <div className='.ost-list-items-bg'>
                      <p><img className='ost-list-img' src='{{this.state.ost.cover.url}' /></p>
                      <div className='ost-list-text text-wrap'>
                        {this.state.ost.title}
                      </div>
                    </div>
                  </a>
                </div>
                {/* % endfor % */}
              </div>

            </div>
          </Container>
        </div>
      </div>
    )
  }
}
