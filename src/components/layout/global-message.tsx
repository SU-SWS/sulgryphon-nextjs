import formatHtml from "@/lib/format-html";
import {DrupalActionLink} from "@/components/patterns/link";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/20/solid";
import {getConfigPage} from "@/lib/gql/fetcher";
import {StanfordGlobalMessage} from "@/lib/gql/__generated__/drupal.d";
import {JSX} from "react";

const GlobalMessage = async () => {
  let configPage: StanfordGlobalMessage | undefined;
  try {
    configPage = await getConfigPage<StanfordGlobalMessage>("StanfordGlobalMessage")
  } catch (e) {
    return null;
  }

  if (!configPage || !configPage.suGlobalMsgEnabled) {
    return null;
  }

  const options: Record<StanfordGlobalMessage["suGlobalMsgType"], { bgColor: string, textColor: string, linkClasses: string, icon: JSX.Element }> = {
    plain: {
      bgColor: "bg-foggy-light",
      textColor: "text-black-true",
      linkClasses: "transition text-black-true hocus:text-black hocus:bg-sky",
      icon: <BellIcon width={30}/>
    },
    success: {
      bgColor: "bg-digital-green",
      textColor: "text-white",
      linkClasses: "transition text-white hocus:text-black hocus:bg-white",
      icon: <CheckCircleIcon width={30}/>
    },
    info: {
      bgColor: "bg-digital-blue-dark",
      textColor: "text-white",
      linkClasses: "transition text-white hocus:text-black hocus:bg-white",
      icon: <InformationCircleIcon width={30}/>
    },
    warning: {
      bgColor: "bg-illuminating-dark",
      textColor: "text-black-true",
      linkClasses: "transition text-black-true hocus:text-black hocus:bg-sky",
      icon: <ExclamationCircleIcon width={30}/>
    },
    error: {
      bgColor: "bg-digital-red",
      textColor: "text-white",
      linkClasses: "transition text-white hocus:text-black hocus:bg-white",
      icon: <ExclamationTriangleIcon width={30}/>
    },
  }
  const chosenOption = options[configPage.suGlobalMsgType || "success"];

  return (
    <div className={"relative z-30 lg:z-0 " + chosenOption.bgColor + " " + chosenOption.textColor}>

      <div className="centered flex gap-2xl py-20">
        <div className="flex-shrink-0 flex items-center justify-center">
          {chosenOption.icon}
          {configPage.suGlobalMsgLabel}
        </div>

        <div>
          {configPage.suGlobalMsgHeader &&
            <h2 className="text-m3">{configPage.suGlobalMsgHeader}</h2>
          }

          {configPage.suGlobalMsgMessage?.processed &&
            <div className={chosenOption.textColor}>
              {formatHtml(configPage.suGlobalMsgMessage.processed.replace(/<a /, `<a class="${chosenOption.linkClasses}" `))}
            </div>
          }

          {configPage.suGlobalMsgLink?.url &&
            <DrupalActionLink href={configPage.suGlobalMsgLink.url} className={chosenOption.linkClasses}>
              {configPage.suGlobalMsgLink.title}
            </DrupalActionLink>
          }
        </div>
      </div>
    </div>
  )
}

export default GlobalMessage;