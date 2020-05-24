import React from 'react'

export default class OstDetail extends React.Component {
  render () {
    return (
      <div class='ost-container' style={{ backgroundImage: 'url({{this.props.ost.cover.url})' }}>
        <div class='background-overlay'>
          <div class='container'>

            <div class='ost-detail'>
              <div class='row'>
                <div class='col-lg-5'><img class='img-fluid' src='{this.props.ost.cover.url }' /></div>
                <div class='col-lg-7 blackblock'>
                  <h1 class='text-center ost-title'>{this.props.ost.title}</h1>
                  <h6 class='text-center tracklist'>{this.props.ost.sub_title}</h6>
                  <table class='table table-dark'>
                    <tbody>
                      <tr>
                        <th class='width-row'>Release Date</th>
                        <td>{this.props.ost.release_date}</td>
                      </tr>
                      {/* % if this.props.ost.artists % */}
                      <tr>
                        <th>Composers</th>
                        <td>
                          {this.props.ost.artists}
                        </td>
                      </tr>
                      {/* % endif % */}
                      <tr>
                        <th>Classification</th>
                        <td>
                          {/* % if this.props.ost.class_game == 1 and this.props.ost.class_animation == 0 % */}Game Soundtrack {/* % endif % */}
                          {/* % if this.props.ost.class_game == 0 and this.props.ost.class_animation == 1 % */}Animation Soundtrack {/* % endif % */}
                          {/* % if this.props.ost.class_game == 1 and this.props.ost.class_animation == 1 % */}Game Soundtrack & Animation Soundtrack {/* % endif % */}
                          - {/* % for title in this.props.ost.type.all % */} {this.props.title}, {/* % endfor % */}
                        </td>
                      </tr>
                      {/* % if this.props.ost.label % */}
                      <tr>
                        <th>Published by</th>
                        <td>{this.props.ost.label}</td>
                      </tr>
                      {/* % endif % */}
                      {/* % if this.props.ost.platform.all % */}
                      <tr>
                        <th>Platforms</th>
                        <td>
                          {/* % for platform in this.props.ost.platform.all % */}
                          <a href='/platform/{{platform.slug}'>{this.props.platform.title}</a>
                          {/* % endfor % */}
                        </td>
                      </tr>
                      {/* % endif % */}
                      {/* % if this.props.ost.games.all % */}
                      <tr>
                        <th>Games</th>
                        <td>
                          {/* % for game in this.props.ost.games.all % */}
                          <a href='/game/{{game.slug}'>{this.props.game.title}</a>
                          {/* % endfor % */}
                        </td>
                      </tr>
                      {/* % endif % */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <hr class='style2 style-white' />

            <div class='row'>
              <div class='col-lg-6'>
                <div class='blackblock h-100 d-inline-block'>
                  <h1 class='text-center ost-title'>TRACKLIST</h1>
                  <h6 class='tracklist'>{this.props.ost.tracklist}</h6>
                </div>
              </div>
              <div class='col-lg-6'>
                <div class='blackblock'>
                  <p class='pl-2'>Check album at:</p>
                  {/* % if this.props.ost.vgmdb_link % */}
                  <a target='_blank' href='{this.props.ost.vgmdb_link }'><img width='100px' src='https://vgmdb.net/db/img/vgmdblogo.png' /></a>
                  {/* % endif % */}
                  <div class='red-block mt-2'>
                    <h1 class='text-center ost-title'>Buy The Original Soundtrack to support the artists</h1>

                    <table>
                      <tr>
                        {/* % if this.props.ost.amazon_html % */}
                        <td class='amazon-html'>
                          <div>{this.props.ost.amazon_html}</div>
                        </td>
                        {/* % endif % */}
                        {/* % if this.props.ost.amazon_link % */}
                        <td>
                          <div class='links-list'>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.amazon_link % */}
                              <a target='_blank' href='{{this.props.ost.amazon_link}'><img class='link-img' src='/static/amazon_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.amazon_jp % */}
                              <a target='_blank' href='{{this.props.ost.amazon_jp}'><img class='link-img' src='/static/amazon_jp.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.play_asia_link % */}
                              <a target='_blank' href='{{this.props.ost.play_asia_link}'><img class='link-img' src='/static/play_asia_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.cd_japan_link % */}
                              <a target='_blank' href='{{this.props.ost.cd_japan_link}'><img class='link-img' src='/static/cd_japan_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.spotify_link % */}
                              <a target='_blank' href='{{this.props.ost.spotify_link}'><img class='link-img' src='/static/spotify_link.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.google_play % */}
                              <a target='_blank' href='{{this.props.ost.google_play}'><img class='link-img' src='/static/google_play.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.steam % */}
                              <a target='_blank' href='{{this.props.ost.steam}'><img class='link-img' src='/static/steam.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.mora % */}
                              <a target='_blank' href='{{this.props.ost.mora}'><img class='link-img' src='/static/mora.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.itunes % */}
                              <a target='_blank' href='{{this.props.ost.itunes}'><img class='link-img' src='/static/itunes.jpg' /></a>
                              {/* % endif % */}
                            </div>
                            <div class='links-list-items'>
                              {/* % if this.props.ost.ototoy % */}
                              <a target='_blank' href='{{this.props.ost.ototoy}'><img class='link-img' src='/static/ototoy.jpg' /></a>
                              {/* % endif % */}
                            </div>
                          </div>
                        </td>
                        {/* % endif % */}
                      </tr>
                    </table>

                  </div>

                  <div class='mt-3'>
                    <div class='col-xs-1 text-center'><h2 class='text-center ost-title'>MP3</h2></div>
                    {/* % if this.props.ost.download_link_1 % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_1}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_1 }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_1_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_2 % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_2}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_2 }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_2_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_3 % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_3}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_3 }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_3_soc }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_1_flac or this.props.ost.download_link_2_flac or this.props.ost.download_link_3_flac % */}
                    <div class='col-xs-1 text-center mt-3'><h2 class='text-center ost-title'>FLAC</h2></div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_1_flac % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_1_flac}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_1_flac }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_1_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_2_flac % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_2_flac}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_2_flac }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_2_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                    {/* % if this.props.ost.download_link_3_flac % */}
                    <div class='col-xs-1 text-center'>{this.props.ost.download_link_choices_3_flac}</div>
                    <div class='col-xs-1 text-center'>
                      <button class='download-button col-lg-6'><a target='_blank' class='dla' href='{this.props.ost.download_link_3_flac }'>DOWNLOAD</a></button>
                      <button class='download-button-soc col-lg-6'><a target='_blank' class='dlas' href='{this.props.ost.download_link_3_soc_flac }'>DOWNLOAD</a></button>
                    </div>
                    {/* % endif % */}
                  </div>

                </div>

              </div>

              <div class='blackblock w-100 m-3'><h1 class='text-center ost-title'>RELATED SOUNDTRACKS</h1></div>

              <div class='links-list w-100 m-3'>
                {/* % for ost in this.props.ost.releated_this.props.ost.all % */}
                <div class='ost-list-items'>
                  <a href='/ost/{{this.props.ost.slug}'>
                    <div class='.ost-list-items-bg'>
                      <p><img class='ost-list-img' src='{{this.props.ost.cover.url}' /></p>
                      <div class='ost-list-text text-wrap'>
                        {this.props.ost.title}
                      </div>
                    </div>
                  </a>
                </div>
                {/* % endfor % */}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
