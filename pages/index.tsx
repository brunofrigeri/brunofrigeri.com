import Image from 'next/image'
import images from '../public/assets/images'
import Button from './components/Button'
import Posts from './components/Posts'
import Container from './containers/Container'
import { useTheme } from 'next-themes'

export default function Home() {
  const { theme } = useTheme()

  return (
    <Container>
      <div>
        <div className="flex flex-row justify-between items-start">
          <div>
            <h1 className="md:text-4xl text-black dark:text-white">
              Hey, I'm Bruno. <br />
              Nice to meet you!
            </h1>
            <h4 className="md:text-lg my-2 mb-8 text-description_light dark:text-description_dark">
              I'm a software developer, writer and
              <br />
              passionate about traveling from Brazil.
            </h4>
            <Button>Book a meeting with me.</Button>
          </div>
          <div id="presentation">
            <Image
              src={
                theme === 'light'
                  ? images.presentationLight.src
                  : images.presentationDark.src
              }
              width={300}
              height={300}
            />
          </div>
        </div>
        <Posts title="Most Popular Writing" />
      </div>
    </Container>
  )
}
