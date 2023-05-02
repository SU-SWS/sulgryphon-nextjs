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
      bgColor: "su-bg-foggy-light",
      textColor: "su-text-black-true",
      linkClasses: "su-transition su-text-black-true hocus:su-text-black hocus:su-bg-sky",
      icon: <BellIcon width={30}/>
    },
    success: {
      bgColor: "su-bg-digital-green",
      textColor: "su-text-white",
      linkClasses: "su-transition su-text-white hocus:su-text-black hocus:su-bg-white",
      icon: <CheckCircleIcon width={30}/>
    },
    info: {
      bgColor: "su-bg-digital-blue-dark",
      textColor: "su-text-white",
      linkClasses: "su-transition su-text-white hocus:su-text-black hocus:su-bg-white",
      icon: <InformationCircleIcon width={30}/>
    },
    warning: {
      bgColor: "su-bg-illuminating-dark",
      textColor: "su-text-black-true",
      linkClasses: "su-transition su-text-black-true hocus:su-text-black hocus:su-bg-sky",
      icon: <ExclamationCircleIcon width={30}/>
    },
    error: {
      bgColor: "su-bg-digital-red",
      textColor: "su-text-white",
      linkClasses: "su-transition su-text-white hocus:su-text-black hocus:su-bg-white",
      icon: <ExclamationTriangleIcon width={30}/>
    },
  }
  const chosenOption = options[configPage.su_global_msg_type];

  return (
    <div className={"su-relative su-z-30 lg:su-z-0 " + chosenOption.bgColor + " " + chosenOption.textColor}>

      <div className="su-cc su-flex su-gap-2xl su-py-20">
        <div className="su-flex-shrink-0 su-flex su-items-center su-justify-center">
          {chosenOption.icon}
          {configPage.su_global_msg_label}
        </div>

        <div>
          <Conditional showWhen={configPage.su_global_msg_header}>
            <h2 className="su-text-m3">{configPage.su_global_msg_header}</h2>
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