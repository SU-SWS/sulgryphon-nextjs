import {BasicPage} from "../../types/drupal";
import {StanfordBanner} from "@/components/paragraphs/stanford-banner";
import {Rows} from "@/components/paragraphs/row";
import {DrupalLink} from "@/components/simple/link";
import {MainContentLayout} from "@/components/layouts/main-content-layout";
import {NextSeo} from "next-seo";

interface BasicPageNodeProps {
  node: BasicPage
  homepage?: boolean
}

export const NodeStanfordPage = ({node, homepage = false, ...props}: BasicPageNodeProps) => {

  return (
    <>
      <NextSeo
        description={node.su_page_description}
      />
      {!homepage &&
          <div className="su-cc">
              <h1 className={`su-mt-[50px] ${node.su_page_banner ? 'su-sr-only' : ''}`}>
                {node.title}
              </h1>
          </div>
      }
      {node.su_page_banner && <StanfordBanner className="su-mb-[50px]" paragraph={node.su_page_banner}/>}

      <MainContentLayout fullWidth={homepage}>
        <article>
          {node.su_page_components && <Rows rows={node.su_page_components} rowField="su_page_components"/>}
        </article>
      </MainContentLayout>
    </>
  )
}

export const NodeStanfordPageListItem = ({node, ...props}: BasicPageNodeProps) => {
  return (
    <article {...props}>
      <DrupalLink href={node.path.alias}>
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}

export const NodeStanfordPageCard = ({node, ...props}: BasicPageNodeProps) => {
  return (
    <article className="su-shadow-md su-p-[10px]" {...props}>
      <DrupalLink href={node.path.alias}
                  className="su-no-underline su-text-cardinal-red hover:su-underline hover:su-text-black">
        <h2 className="su-text-cardinal-red">{node.title}</h2>
      </DrupalLink>
    </article>
  )
}
