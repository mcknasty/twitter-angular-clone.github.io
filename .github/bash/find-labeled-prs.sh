#!/bin/bash

#https://github.com/sergeysova/jq-action

label=$1

#echo "Log: Finding all Pull Requests labeled ${label}";
PULL_REQUESTS=( $(gh pr list --label "${label}" --json number,url,mergeable,mergeStateStatus | jq -c '.[]') );
URLS=()
for PR in "${PULL_REQUESTS[@]}"; do
  $( echo $PR | jq -r 'to_entries | .[] | "export " + .key + "=" + (.value | @sh)' );
  checksSuccessful=$( gh pr view "${number}" --json statusCheckRollup | jq '.[] | select(.[].conclusion != "SUCCESS")' | wc -m )
  hasConFlicts=$( gh pr view "${number}" --json mergeStateStatus | jq 'select(.mergeStateStatus != "CLEAN")' | wc -m )

  #echo "${number}"
  #echo "${checksSuccessful} ${hasConFlicts}";
  if [[ "${checksSuccessful}" -eq '0' && "${mergeable}" == "'MERGEABLE'" &&  "${hasConFlicts}" -eq '0' ]];
  then
    URLS+=( $( echo $url | sed -e "s@'@@g" ) )
    #echo "Log: Checks Successful for Pull Request #${number} and Pull request is MERGEABLE"
    #gh pr review --approve "$url
    #echo "Log: Pull Request #${number} Approved!"
  fi;
done

echo "'${URLS[@]}'"
