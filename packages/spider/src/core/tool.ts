interface MembersOptions {
  prefix?: any
  specifiedType?: any
  filter?: any
}

/**
 * find function members
 */
export function findMembers(instance: any, options: MembersOptions) {
  function _find(instance: any): any {
    if (instance.__proto__ == null) return []
    // 获取自身属性
    let names = Reflect.ownKeys(instance)
    // 过滤
    names = names.filter((name) => _shouldKeep(name))
    return [...names, ..._find(instance.__proto__)]
  }

  // 过滤条件
  function _shouldKeep(value: any) {
    if (options.filter) if (options.filter(value)) return true
    if (options.prefix) if (value.startsWith(options.prefix)) return true
    if (options.specifiedType) if (instance[value] instanceof options.specifiedType) return true
  }

  return _find(instance)
}
