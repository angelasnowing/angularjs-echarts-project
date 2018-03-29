
define(['app'],function(app){
	return app.provider('geoFactory',[function(){
		return {
			name:'hello',
			$get:function(){
				return {
					name:this.name,
					show:function(){
						return this.name + 'angular';
					}
				}
			}
		}
	}])
})
