import React, { forwardRef, Fragment } from "react";
import type { ComponentInjectPropsType } from "./type";

/**
 * ## InitApp: when component mount
 */
export function ComponentInject<Props, RefProps>(
  params: ComponentInjectPropsType
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<RefProps>
> {
  return forwardRef<RefProps, Props>(function ComponentInject(props, ref) {
    const { providers, template, bootstrap: App, containers } = params;
    let list: ComponentInjectPropsType["providers"] = [];

    if (containers) {
      list = list.concat(containers);
    }
    if (providers) {
      list = list.concat(providers);
    }
    if (template) {
      list = list.concat(template);
    }

    return (
      <Fragment>
        {list.reduceRight((children, Provider) => {
          return <Provider>{children}</Provider>;
        }, <App {...props} ref={ref} />)}
      </Fragment>
    );
  });
}
