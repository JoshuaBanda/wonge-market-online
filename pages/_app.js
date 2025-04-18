
import LayOut from "@/components/LayOut"
 
export default function MyApp({ Component, pageProps }) {
  return (
    <LayOut>
      <Component {...pageProps} />
    </LayOut>
  )
}