import React from 'react';
import {
  Deck,
  Heading,
  Slide,
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';
import CodeSlide from 'spectacle-code-slide'

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quartenary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const codeSplittingCodeOld = `import react from 'React';

class MyComponent extends React.Component {
  state = {
    Bar: null
  };

  componentWillMount() {
    import('./components/Bar').then(Bar => {
      this.setState({ Bar: Bar.default });
    });
  }

  render() {
    let { Bar } = this.state;

    if (!Bar) {
      return <Loading />;
    } else {
      return <Bar />;
    };
  }
}
`

const codeSplittingCodeNew = `import React from 'react';
const Bar = React.lazy(
  () => import('./components/Bar')
);

const MyComponent = () => (
  <React.Suspense fallback={<Loading />}>
    <Bar />
  </React.Suspense>
)
`

const loadingAssetsCodeImg = `import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const ImgResource = createResource(src => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
  });
});

const Img = props => {
  ImgResource.read(props.src);
  return <img {...props} />;
};

export default Img
`

const loadingAssetsCodeComponent = `import React from 'react';
import Img from './components/Img'

const MyComponent = () => (
  <React.Suspense fallback={<Placeholder />}>
    <Img src="/assets/image-hd.jpg" />
  </React.Suspense>
)
`

const fetchDataCodeOld = `import React from 'react';
import { fetchArtistAlbums } from '../api';
import { Spinner } from './Spinner';
import AlbumGrid from './AlbumGrid';

class ArtistAlbums extends React.Component {
  state = {
    isLoading: true,
    albums: [],
    error: '',
  };

  componentDidMount() {
    fetchArtistAlbums(this.props.id).then(
      albums => this.setState({
        isLoading: false,
        albums
      }),
      error => this.setState({
        isLoading: false,
        error
      })
    );
  }

  render() {
    const {
      isLoading,
      albums,
      error,
    } = this.state;

    return (
      <>
        <h3>Albums</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : albums ? (
          <AlbumGrid albums={albums} />
        ) : (
          {error}
        )}
      </>
    );
  }
}

export default ArtistAlbums;
`

const fetchDataCodeNew = `import React, { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import { fetchAlbums } from '../api';
import { Spinner } from './Spinner';
import AlbumGrid from './AlbumGrid';

const Albums = createResource(fetchAlbums);

class ArtistAlbums extends React.Component {
  render() {
    const { id } = this.props
    return (
      <>
        <Suspense fallback={<Spinner />}>
          <h3>Albums</h3>
          <AlbumGrid
            albums={Albums.read(id)}
          />
        </Suspense>
      </>
    );
  }
}

export default ArtistAlbums;
`

const enablingConcurrentReactCode = `// Old way
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// New way
ReactDOM.createRoot(
  document.getElementById('root')
).render(<App />);
`

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['fade']}
        transitionDuration={500}
        progress={null}
        theme={theme}
      >

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            React Suspense
          </Heading>
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            whoami
          </Heading>
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Code splitting
          </Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={codeSplittingCodeOld}
          ranges={[
            {
              loc: [0, 0],
              title: 'The old way',
            },
            { loc: [2, 6] },
            { loc: [7, 12] },
            { loc: [13, 22]}
          ]}
        />

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            react-loadable
          </Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={codeSplittingCodeNew}
          ranges={[
            {
              loc: [0, 0],
              title: 'The new way',
            },
            { loc: [1, 4] },
            { loc: [5, 10] },
          ]}
        />

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Loading assets
          </Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={loadingAssetsCodeImg}
          ranges={[
            { loc: [0, 0], title: '<Img />' },
            { loc: [1, 2] },
            { loc: [3, 4] },
            { loc: [4, 10] },
            { loc: [12, 16] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={loadingAssetsCodeComponent}
          ranges={[
            { loc: [0, 0] },
            { loc: [1, 2] },
            { loc: [3, 8] },
          ]}
        />

        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Fetching data
          </Heading>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={fetchDataCodeOld}
          ranges={[
            { loc: [0, 0], title: 'The old way' },
            { loc: [5, 11] },
            { loc: [12, 24] },
            { loc: [26, 31] },
            { loc: [32, 44] }
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={fetchDataCodeNew}
          ranges={[
            { loc: [0, 0], title: 'The new way' },
            { loc: [1, 2] },
            { loc: [6, 7] },
            { loc: [8, 23] },
            { loc: [12, 20] },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          lang="jsx"
          code={enablingConcurrentReactCode}
          ranges={[
            {
              loc: [0, 0],
              title: 'Enabling concurrent React',
            },
            { loc: [0, 5]},
            { loc: [6, 10]},
          ]}
        />

      </Deck>
    );
  }
}
