# SCRIPT_DIR=$(cd $(dirname $0); pwd)
# echo $SCRIPT_DIR
# node $SCRIPT_DIR/main.js $1 && gulp ejs && node $SCRIPT_DIR/img.js \
# && osascript -e 'set the clipboard to (read "'"$SCRIPT_DIR"'/map.png" as TIFF picture)'\
# && echo "Successfully copied to the clipboard"\
# && node $SCRIPT_DIR/showPath.js

read_real_path() {
    local cwd="$(pwd)"
    local path="$1"

    while [ -n "$path" ]; do
        if [ "${path%/*}" != "$path" ]; then
            cd "${path%/*}" # $path に含まれる最後の "/" から後ろを削除したパスにcd
        fi
        local name="${path##*/}" # $path に含まれる最後の "/" から後ろを name に代入
        path="$(readlink "$name" || true)"
    done

    echo $(pwd)/$name
    cd "$cwd"
}
# シェルスクリプト自身の絶対パスを取得する例
SCRIPT_PATH="$(read_real_path $0)"
SCRIPT_DIRECTORY_PATH=$(dirname $SCRIPT_PATH)
node $SCRIPT_DIRECTORY_PATH/main.js $1 && node $SCRIPT_DIRECTORY_PATH/ejsToHtml.js && node $SCRIPT_DIRECTORY_PATH/img.js \
&& osascript -e 'set the clipboard to (read "'"$SCRIPT_DIRECTORY_PATH"'/map.png" as TIFF picture)'\
&& printf "\e[34;1mSuccessfully copied to your clipboard!!\e[m"\
&& echo ""\
&& node $SCRIPT_DIRECTORY_PATH/showPath.js