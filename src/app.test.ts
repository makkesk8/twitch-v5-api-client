import should = require('should');
import { TwitchClient, UsersInterface, ChannelInterface, FollowersInterface, TeamsInterface, VideosInterface }  from './app';

const Client = new TwitchClient('t7esel84mtsx2x0lhxuppvonn5naclz');
const TestUser = {
  id: 23161357,
  name: 'lirik'
};

const TestUser2 = {
  id: 27446517,
  name: 'monstercat'
}

describe('Channels', function() {
  
  describe('#GetChannelsByUsername()', function() {
      it('should return an array of users', function(done) {
        Client.GetChannelsByUsername([TestUser.name, TestUser2.name]).then((data: UsersInterface) => {
          should(data.users[0]).have.properties(['display_name', '_id', 'name', 'type', 'bio', 'created_at', 'updated_at', 'logo'])
          data._total.should.equal(2);
          data.users.should.be.type('object');

          done();
        });
      });
  });

  describe('#GetChannelById()', function() {
      it('should return an user object', function(done) {
        Client.GetChannelById(TestUser.id).then((data: ChannelInterface) => {
          data.should.have.properties(
            ['mature', 'status', 'broadcaster_language', 'display_name', 'game', 'language',
            'name', 'created_at', 'updated_at', '_id', 'logo', 'video_banner', 'profile_banner', 
            'profile_banner_background_color', 'partner', 'url', 'views', 'followers']);
          data.name.should.equal(TestUser.name);
          data._id.should.equal(TestUser.id.toString());

          done();
        });
      });
  });

  describe('#GetChannelFollowers()', function() {
      it('should return a list of users following a user', function(done) {
        Client.GetChannelFollowers(TestUser.id).then((data: FollowersInterface) => {
          should(data.follows).be.type('object');
          data.should.have.properties(['_cursor', '_total', 'follows'])
          data.follows[0].should.have.properties(['created_at', 'notifications', 'user']);

          done();
        });
      });
  });



  describe('#GetChannelTeams()', function() {
      it('should return a list of teams of a user', function(done) {
        Client.GetChannelTeams(TestUser.id).then((data: Array<TeamsInterface>) => {
          data.should.be.type('object');
          should(data[0]).have.properties(['_id', 'background', 'banner', 'created_at', 
            'display_name', 'info', 'logo', 'name', 'updated_at']);

          done();
        });
      });
  });


  describe('#GetChannelVideos()', function() {
      it('should return a list of videos of a user', function(done) {
        Client.GetChannelVideos(TestUser.id).then((data: VideosInterface) => {
          data.videos.should.be.type('object');
          should(data.videos[0]).have.properties(['_id', 'broadcast_id', 'broadcast_type', 'created_at', 
          'description', 'description_html', 'game', 'language', 'length', 'published_at', 'status', 
          'tag_list', 'title', 'url', 'viewable', 'viewable_at', 'views', 'fps', 'resolutions']);
          should(data.videos[0]).have.property('channel').have.properties(['_id', 'display_name', 'name']);
          should(data.videos[0]).have.property('preview').have.properties(['large', 'medium', 'small', 'template']);
          should(data.videos[0]).have.property('thumbnails').have.properties(['large', 'medium', 'small', 'template']);
          
          done();
        });
      });
  });


});