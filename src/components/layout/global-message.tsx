import {GlobalMessageType} from "@/lib/drupal/drupal";
import formatHtml from "@/lib/format-html";
import {DrupalActionLink} from "@/components/patterns/link";
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/20/solid";
import Conditional from "@/components/utils/conditional";
import {getResourceCollection} from "@/lib/drupal/get-resource";

const GlobalMessage = async () => {
  let response;
  try {
    response = await getResourceCollection('config_pages--stanford_global_message');
    if (response.length === 0) {
      return null;
    }
  } catch (e) {
    return null;
  }

  const configPage = response.at(0) satisfies GlobalMessageType;
  if (!configPage || !configPage.su_global_msg_enabled) {
    return null;
  }

  const options = {
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
  const chosenOption = options[configPage.su_global_msg_type];

  return (
    <div className={"relative z-30 lg:z-0 " + chosenOption.bgColor + " " + chosenOption.textColor}>

      <div className="centered flex gap-2xl py-20">
        <div className="flex-shrink-0 flex items-center justify-center">
          {chosenOption.icon}
          {configPage.su_global_msg_label}
        </div>

        <div>
          <Conditional showWhen={configPage.su_global_msg_header}>
            <h2 className="text-m3">{configPage.su_global_msg_header}</h2>
          </Conditional>

          {configPage.su_global_msg_message &&
            <div className={chosenOption.textColor}>
              {formatHtml(configPage.su_global_msg_message?.replace(/<a /, `<a class="${chosenOption.linkClasses}" `))}
            </div>
          }

          {configPage.su_global_msg_link?.url &&
            <DrupalActionLink href={configPage.su_global_msg_link?.url} className={chosenOption.linkClasses}>
              {configPage.su_global_msg_link?.title}
            </DrupalActionLink>
          }
        </div>
      </div>
    </div>
  )
}

export default GlobalMessage;